"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Search, Send, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Conversation = {
  id: string;
  contact_name: string | null;
  contact_phone: string;
  status: string;
  last_message_at: string;
  business_id: string;
};

type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  sent_at: string;
};

const statusColors: Record<string, string> = {
  open: "bg-green-500/10 text-green-400 border-green-500/20",
  resolved: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

const statusLabels: Record<string, string> = {
  open: "Aberta",
  resolved: "Resolvida",
  pending: "Pendente",
};

export default function ConversasPage() {
  const supabase = createClient();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [filteredConvs, setFilteredConvs] = useState<Conversation[]>([]);
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loadingConvs, setLoadingConvs] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    let result = conversations;
    if (search) {
      result = result.filter((c) =>
        (c.contact_name ?? c.contact_phone).toLowerCase().includes(search.toLowerCase())
      );
    }
    if (statusFilter !== "all") {
      result = result.filter((c) => c.status === statusFilter);
    }
    setFilteredConvs(result);
  }, [conversations, search, statusFilter]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadConversations = async () => {
    setLoadingConvs(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data: businesses } = await supabase
      .from("businesses")
      .select("id")
      .eq("user_id", user.id);
    if (!businesses?.length) {
      setLoadingConvs(false);
      return;
    }

    const { data: convs } = await supabase
      .from("conversations")
      .select("*")
      .in(
        "business_id",
        businesses.map((b) => b.id)
      )
      .order("last_message_at", { ascending: false });

    setConversations(convs ?? []);
    setLoadingConvs(false);
  };

  const loadMessages = async (conv: Conversation) => {
    setSelectedConv(conv);
    setLoadingMessages(true);
    const { data: msgs } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conv.id)
      .order("sent_at", { ascending: true });

    setMessages((msgs ?? []) as Message[]);
    setLoadingMessages(false);
  };

  const sendReply = async () => {
    if (!reply.trim() || !selectedConv) return;
    setSending(true);
    const { data: msg, error } = await supabase
      .from("messages")
      .insert({ conversation_id: selectedConv.id, role: "assistant", content: reply })
      .select()
      .single();

    if (error) {
      toast({ title: "Erro ao enviar mensagem", variant: "destructive" });
    } else {
      setMessages((prev) => [...prev, msg as Message]);
      setReply("");
    }
    setSending(false);
  };

  return (
    <div className="flex h-full">
      {/* Left panel */}
      <div className="w-80 shrink-0 border-r border-[#1a1a1a] flex flex-col bg-[#111111]">
        <div className="p-4 space-y-3 border-b border-[#1a1a1a]">
          <h2 className="text-white font-semibold">Conversas</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-[#0a0a0a] border-[#2a2a2a] text-white placeholder:text-gray-600 text-sm"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="bg-[#0a0a0a] border-[#2a2a2a] text-gray-300 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#111111] border-[#2a2a2a] text-white">
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="open">Aberta</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="resolved">Resolvida</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loadingConvs ? (
            <div className="p-4 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-3/4 bg-[#1a1a1a]" />
                  <Skeleton className="h-3 w-1/2 bg-[#1a1a1a]" />
                </div>
              ))}
            </div>
          ) : filteredConvs.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm">Nenhuma conversa</p>
            </div>
          ) : (
            filteredConvs.map((conv) => (
              <div
                key={conv.id}
                onClick={() => loadMessages(conv)}
                className={cn(
                  "p-4 border-b border-[#1a1a1a] cursor-pointer hover:bg-[#1a1a1a] transition-colors",
                  selectedConv?.id === conv.id && "bg-[#1a1a1a] border-l-2 border-l-[#25D366]"
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-white truncate">
                    {conv.contact_name ?? conv.contact_phone}
                  </span>
                  <Badge className={`text-xs border shrink-0 ml-2 ${statusColors[conv.status] ?? ""}`}>
                    {statusLabels[conv.status] ?? conv.status}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500">{conv.contact_phone}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col">
        {!selectedConv ? (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>Selecione uma conversa</p>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="p-4 border-b border-[#1a1a1a] bg-[#111111] flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">
                  {selectedConv.contact_name ?? selectedConv.contact_phone}
                </h3>
                <p className="text-xs text-gray-500">{selectedConv.contact_phone}</p>
              </div>
              <Badge className={`text-xs border ${statusColors[selectedConv.status] ?? ""}`}>
                {statusLabels[selectedConv.status] ?? selectedConv.status}
              </Badge>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {loadingMessages ? (
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      className={`h-10 w-2/3 bg-[#1a1a1a] rounded-xl ${i % 2 === 0 ? "" : "ml-auto"}`}
                    />
                  ))}
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <p className="text-sm">Nenhuma mensagem ainda</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className={cn("flex", msg.role === "user" ? "justify-start" : "justify-end")}>
                    <div
                      className={cn(
                        "max-w-xs px-4 py-2 rounded-2xl text-sm",
                        msg.role === "user"
                          ? "bg-[#1a1a1a] text-white rounded-tl-sm"
                          : "bg-[#25D366] text-black font-medium rounded-tr-sm"
                      )}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[#1a1a1a] bg-[#111111] flex gap-2">
              <Input
                placeholder="Responder manualmente..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendReply();
                  }
                }}
                className="bg-[#0a0a0a] border-[#2a2a2a] text-white placeholder:text-gray-600"
              />
              <Button
                onClick={sendReply}
                disabled={sending || !reply.trim()}
                className="bg-[#25D366] hover:bg-[#1aab52] text-black"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
