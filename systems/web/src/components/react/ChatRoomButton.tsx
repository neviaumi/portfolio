import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect, useRef, useState } from 'react';

function ChatRoom({
  hidden,
  onClose,
}: {
  hidden?: boolean;
  onClose: () => void;
}) {
  const chatRoomRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!chatRoomRef.current) return;
    const chatRoom = chatRoomRef.current;
    chatRoom.addEventListener('close', onClose);
    return () => {
      chatRoom.removeEventListener('close', onClose);
    };
  });
  return (
    <Modal
      keepMounted
      onClose={onClose}
      open={!hidden}
      sx={{
        alignItems: 'center', // Center vertically
        display: 'flex', // Flexbox for centering
        justifyContent: 'center', // Center horizontally
        paddingY: 2,
      }}
    >
      <Box
        sx={{
          '& portfolio-chat-room': {
            height: 'calc(100vh - 32px)',
          },
          width: 'fit-content',
        }}
      >
        {/*@ts-expect-error No typing for web component*/}
        <portfolio-chat-room ref={chatRoomRef}></portfolio-chat-room>
      </Box>
    </Modal>
  );
}

export default function ChatRoomButton() {
  const [shouldChatRoomOpen, setChatRoomOpen] = useState(false);
  function openChatRoom() {
    setChatRoomOpen(true);
  }
  function onChatRoomClose() {
    setChatRoomOpen(false);
  }

  return (
    <>
      <ChatRoom hidden={!shouldChatRoomOpen} onClose={onChatRoomClose} />
      {/*@ts-expect-error No typing for web component*/}
      <portfolio-chat-room-fab onClick={openChatRoom}></portfolio-chat-room-fab>
    </>
  );
}
