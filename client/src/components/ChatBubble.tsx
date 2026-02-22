import { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your Lakefront support agent. How can I help you today?", sender: "agent", time: "10:00 AM" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setMessages(prev => [...prev, { 
      id: Date.now(), 
      text: inputValue, 
      sender: "user",
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }]);
    
    setInputValue("");
    setIsTyping(true);
    
    // Simulate smart auto-reply
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "Thanks for reaching out! In this demo mode, I'm an automated assistant. A real agent will review your request in the admin dashboard.",
        sender: "agent",
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      }]);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 h-[500px] bg-[#0f172a] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/90 to-secondary/90 p-4 flex items-center justify-between shrink-0 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-white/20 shadow-md">
                <AvatarImage src="/assets/images/avatar-2.jpg" alt="Support Agent" />
                <AvatarFallback>AG</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-sm text-white">Lakefront Support</h3>
                <p className="text-[10px] text-white/90 flex items-center gap-1 uppercase tracking-wider font-semibold">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Online
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-black/40 custom-scrollbar">
            <div className="space-y-4 pb-2">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] px-4 py-2.5 text-sm shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-primary-foreground rounded-2xl rounded-tr-sm' 
                      : 'bg-[#1e293b] text-white border border-white/5 rounded-2xl rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-1 px-1 font-medium">{msg.time}</span>
                </div>
              ))}
              {isTyping && (
                 <div className="flex flex-col items-start">
                  <div className="bg-[#1e293b] border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1">
                    <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                    <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-3 border-t border-white/5 bg-[#0f172a] shrink-0">
            <form onSubmit={handleSend} className="flex gap-2 bg-black/40 rounded-full p-1 border border-white/10 focus-within:border-primary/50 transition-colors">
              <Input 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..." 
                className="rounded-full border-none bg-transparent focus-visible:ring-0 text-white placeholder:text-white/30"
              />
              <Button type="submit" size="icon" className="rounded-full shrink-0 shadow-md bg-primary hover:bg-primary/90 text-primary-foreground">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Bubble Toggle */}
      <Button 
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className={`h-14 w-14 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] border-2 border-white/10 transition-transform duration-300 hover:scale-105 z-50 ${isOpen ? 'rotate-90 bg-muted text-foreground' : 'bg-primary text-primary-foreground shadow-[0_0_20px_rgba(34,197,94,0.4)]'}`}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>
    </div>
  );
}