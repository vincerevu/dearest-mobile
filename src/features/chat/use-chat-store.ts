import { create } from 'zustand';
import { getItem, setItem } from '@/lib/storage';

export type ChatMessage = { id: string; role: 'assistant' | 'user'; text: string };
export type ChatThread = { id: string; preview: string; title: string; updatedAt: number; messages: ChatMessage[] };

type ChatState = {
  activeThreadId: string;
  createThread: () => void;
  selectThread: (id: string) => void;
  sendMessage: (text: string) => void;
  threads: ChatThread[];
};

type PersistedChatState = Pick<ChatState, 'activeThreadId' | 'threads'>;
const storageKey = 'dovie-chat-state-v1';
const now = Date.now();
const defaults: PersistedChatState = {
  activeThreadId: 'today',
  threads: [
    { id: 'today', messages: [], preview: '', title: 'Hôm nay', updatedAt: now },
    { id: 'sep-3', messages: [{ id: 'old-1', role: 'user', text: 'Dạo này mình hơi mệt...' }, { id: 'old-2', role: 'assistant', text: 'Mình nghe cậu đây. Hôm nay mình cứ đi chậm một chút nhé.' }], preview: 'Dạo này mình hơi mệt...', title: '3 tháng 9', updatedAt: now - 86400000 },
    { id: 'sep-1', messages: [{ id: 'old-3', role: 'user', text: 'Khó ngủ mấy hôm nay' }], preview: 'Khó ngủ mấy hôm nay', title: '1 tháng 9', updatedAt: now - 259200000 },
  ],
};
const initial = { ...defaults, ...getItem<Partial<PersistedChatState>>(storageKey) };
const persist = (state: PersistedChatState) => { void setItem(storageKey, state); };
const response = 'Cảm ơn cậu đã chia sẻ. Mình ở đây cùng cậu, mình có thể bắt đầu từ một điều nhỏ và nhẹ nhàng nhé.';

export const useChatStore = create<ChatState>((set, get) => ({
  ...initial,
  createThread: () => set(state => {
    const id = `thread-${Date.now()}`;
    const threads = [{ id, messages: [], preview: '', title: 'Cuộc trò chuyện mới', updatedAt: Date.now() }, ...state.threads];
    persist({ activeThreadId: id, threads });
    return { activeThreadId: id, threads };
  }),
  selectThread: id => set(state => {
    persist({ activeThreadId: id, threads: state.threads });
    return { activeThreadId: id };
  }),
  sendMessage: text => {
    const value = text.trim();
    if (!value) return;
    const state = get();
    const timestamp = Date.now();
    const messages: ChatMessage[] = [{ id: `user-${timestamp}`, role: 'user', text: value }, { id: `dovie-${timestamp}`, role: 'assistant', text: response }];
    const threads = state.threads.map(thread => thread.id === state.activeThreadId ? { ...thread, messages: [...thread.messages, ...messages], preview: value, title: thread.title === 'Cuộc trò chuyện mới' ? 'Hôm nay' : thread.title, updatedAt: timestamp } : thread).sort((a, b) => b.updatedAt - a.updatedAt);
    persist({ activeThreadId: state.activeThreadId, threads });
    set({ threads });
  },
}));
