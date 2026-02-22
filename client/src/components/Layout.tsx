import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { ChatBubble } from "./ChatBubble";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ChatBubble />
    </div>
  );
}