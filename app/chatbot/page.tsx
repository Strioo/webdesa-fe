'use client'

import { useChatbot } from '@/hooks/useChatbot'
import ChatHeader from '@/components/chatbot/ChatHeader'
import ChatMessages from '@/components/chatbot/ChatMessages'
import ChatInput from '@/components/chatbot/ChatInput'
import { motion } from 'framer-motion'

export default function ChatbotPage() {
  const {
    messages,
    isLoading,
    input,
    setInput,
    sendMessage,
    clearChat,
    sendQuickAction,
    messagesEndRef,
  } = useChatbot()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-screen bg-gradient-to-b from-neutral-50 to-white"
    >
      {/* Header */}
      <ChatHeader onReset={clearChat} />

      {/* Messages Area */}
      <ChatMessages
        messages={messages}
        isLoading={isLoading}
        messagesEndRef={messagesEndRef}
      />

      {/* Input Area */}
      <ChatInput
        input={input}
        setInput={setInput}
        onSend={sendMessage}
        isLoading={isLoading}
        onQuickAction={sendQuickAction}
      />
    </motion.div>
  )
}
