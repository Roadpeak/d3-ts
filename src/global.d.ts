export {};

declare global {
  interface Window {
    Pusher: any;
    BrevoConversationsID: string;
    BrevoConversations: any;
  }
}
