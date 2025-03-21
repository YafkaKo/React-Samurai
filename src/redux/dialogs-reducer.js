import { DispatchConst } from './store'

const initialState = {
  chats: [
    {
      id: 1,
      nickname: 'user1',
      avatar: 'https://example.com/avatar1.jpg',
      messages: [
        { id: 1, text: 'Привет! Как твои дела?', timestamp: '2023-10-01T10:00:00Z', isMyMessage: true },
        {
          id: 2,
          text: 'Привет! Все отлично, спасибо! А у тебя как?',
          timestamp: '2023-10-01T10:05:00Z',
          isMyMessage: false
        },
        {
          id: 3,
          text: 'Тоже все хорошо, работаю над новым проектом.',
          timestamp: '2023-10-01T10:10:00Z',
          isMyMessage: true
        },
        {
          id: 4,
          text: 'Здорово! Расскажешь подробнее?',
          timestamp: '2023-10-01T10:15:00Z',
          isMyMessage: false
        },
        {
          id: 5,
          text: 'Конечно! Это приложение для управления задачами. Уже почти закончил.',
          timestamp: '2023-10-01T10:20:00Z',
          isMyMessage: true
        }
      ],
      newMessageText: ''
    },
    {
      id: 2,
      nickname: 'user2',
      avatar: 'https://example.com/avatar2.jpg',
      messages: [
        {
          id: 1,
          text: 'Здравствуй! Что планируешь на выходные?',
          timestamp: '2023-10-01T11:00:00Z',
          isMyMessage: true
        },
        {
          id: 2,
          text: 'Привет! Пока не решил, может, поеду за город. А ты?',
          timestamp: '2023-10-01T11:10:00Z',
          isMyMessage: false
        },
        {
          id: 3,
          text: 'Я думаю сходить в кино, давно хотел посмотреть новый фильм.',
          timestamp: '2023-10-01T11:15:00Z',
          isMyMessage: true
        },
        { id: 4, text: 'Отличная идея! Какой фильм?', timestamp: '2023-10-01T11:20:00Z', isMyMessage: false },
        {
          id: 5,
          text: 'Думаю, посмотрю что-то из фантастики. Может, \'Дюна\'.',
          timestamp: '2023-10-01T11:25:00Z',
          isMyMessage: true
        }
      ],
      newMessageText: ''
    },
    {
      id: 3,
      nickname: 'user3',
      avatar: 'https://example.com/avatar3.jpg',
      messages: [
        {
          id: 1,
          text: 'Привет! Как твой день проходит?',
          timestamp: '2023-10-01T12:00:00Z',
          isMyMessage: true
        },
        {
          id: 2,
          text: 'Привет! Пока все спокойно, работаю. А у тебя?',
          timestamp: '2023-10-01T12:05:00Z',
          isMyMessage: false
        },
        {
          id: 3,
          text: 'Тоже работаю, но уже устал. Думаю, скоро сделаю перерыв.',
          timestamp: '2023-10-01T12:10:00Z',
          isMyMessage: true
        },
        {
          id: 4,
          text: 'Понятно. Может, прогуляешься? Это помогает отдохнуть.',
          timestamp: '2023-10-01T12:15:00Z',
          isMyMessage: false
        },
        {
          id: 5,
          text: 'Хорошая идея! Спасибо за совет.',
          timestamp: '2023-10-01T12:20:00Z',
          isMyMessage: true
        }
      ],
      newMessageText: ''
    },
    {
      id: 4,
      nickname: 'user4',
      avatar: 'https://example.com/avatar4.jpg',
      messages: [
        { id: 1, text: 'Привет! Что нового?', timestamp: '2023-10-01T13:00:00Z', isMyMessage: true },
        {
          id: 2,
          text: 'Привет! Ничего особенного, работаю. А у тебя?',
          timestamp: '2023-10-01T13:05:00Z',
          isMyMessage: false
        },
        {
          id: 3,
          text: 'Я тоже работаю, но планирую на выходные выбраться куда-нибудь.',
          timestamp: '2023-10-01T13:10:00Z',
          isMyMessage: true
        },
        {
          id: 4,
          text: 'Здорово! Куда думаешь поехать?',
          timestamp: '2023-10-01T13:15:00Z',
          isMyMessage: false
        },
        {
          id: 5,
          text: 'Пока не решил, может, в горы или на озеро.',
          timestamp: '2023-10-01T13:20:00Z',
          isMyMessage: true
        }
      ],
      newMessageText: ''
    },
    {
      id: 5,
      nickname: 'user5',
      avatar: 'https://example.com/avatar5.jpg',
      messages: [
        { id: 1, text: 'Привет! Как жизнь?', timestamp: '2023-10-01T14:00:00Z', isMyMessage: true },
        {
          id: 2,
          text: 'Привет! Все хорошо, спасибо! А у тебя?',
          timestamp: '2023-10-01T14:05:00Z',
          isMyMessage: false
        },
        {
          id: 3,
          text: 'Тоже все отлично, работаю над новым проектом.',
          timestamp: '2023-10-01T14:10:00Z',
          isMyMessage: true
        },
        { id: 4, text: 'Круто! Что за проект?', timestamp: '2023-10-01T14:15:00Z', isMyMessage: false },
        {
          id: 5,
          text: 'Это приложение для изучения языков. Уже почти готово.',
          timestamp: '2023-10-01T14:20:00Z',
          isMyMessage: true
        }
      ],
      newMessageText: ''
    },
    {
      id: 6,
      nickname: 'user6',
      avatar: 'https://example.com/avatar6.jpg',
      messages: [
        { id: 1, text: 'Привет! Как успехи?', timestamp: '2023-10-01T15:00:00Z', isMyMessage: true },
        {
          id: 2,
          text: 'Привет! Все отлично, работаю. А у тебя?',
          timestamp: '2023-10-01T15:05:00Z',
          isMyMessage: false
        },
        {
          id: 3,
          text: 'Тоже работаю, но уже устал. Думаю, скоро сделаю перерыв.',
          timestamp: '2023-10-01T15:10:00Z',
          isMyMessage: true
        },
        {
          id: 4,
          text: 'Понятно. Может, прогуляешься? Это помогает отдохнуть.',
          timestamp: '2023-10-01T15:15:00Z',
          isMyMessage: false
        },
        {
          id: 5,
          text: 'Хорошая идея! Спасибо за совет.',
          timestamp: '2023-10-01T15:20:00Z',
          isMyMessage: true
        }
      ],
      newMessageText: ''
    },
    {
      id: 7,
      nickname: 'user7',
      avatar: 'https://example.com/avatar7.jpg',
      messages: [
        { id: 1, text: 'Привет! Что нового?', timestamp: '2023-10-01T16:00:00Z', isMyMessage: true },
        {
          id: 2,
          text: 'Привет! Ничего особенного, работаю. А у тебя?',
          timestamp: '2023-10-01T16:05:00Z',
          isMyMessage: false
        },
        {
          id: 3,
          text: 'Я тоже работаю, но планирую на выходные выбраться куда-нибудь.',
          timestamp: '2023-10-01T16:10:00Z',
          isMyMessage: true
        },
        {
          id: 4,
          text: 'Здорово! Куда думаешь поехать?',
          timestamp: '2023-10-01T16:15:00Z',
          isMyMessage: false
        },
        {
          id: 5,
          text: 'Пока не решил, может, в горы или на озеро.',
          timestamp: '2023-10-01T16:20:00Z',
          isMyMessage: true
        }
      ],
      newMessageText: ''
    },
    {
      id: 8,
      nickname: 'user8',
      avatar: 'https://example.com/avatar8.jpg',
      messages: [
        { id: 1, text: 'Привет! Как дела?', timestamp: '2023-10-01T17:00:00Z', isMyMessage: true },
        {
          id: 2,
          text: 'Привет! Все хорошо, спасибо! А у тебя?',
          timestamp: '2023-10-01T17:05:00Z',
          isMyMessage: false
        },
        {
          id: 3,
          text: 'Тоже все отлично, работаю над новым проектом.',
          timestamp: '2023-10-01T17:10:00Z',
          isMyMessage: true
        },
        { id: 4, text: 'Круто! Что за проект?', timestamp: '2023-10-01T17:15:00Z', isMyMessage: false },
        {
          id: 5,
          text: 'Это приложение для изучения языков. Уже почти готово.',
          timestamp: '2023-10-01T17:20:00Z',
          isMyMessage: true
        }
      ],
      newMessageText: ''
    },
    {
      id: 9,
      nickname: 'user9',
      avatar: 'https://example.com/avatar9.jpg',
      messages: [
        { id: 1, text: 'Привет! Как ты?', timestamp: '2023-10-01T18:00:00Z', isMyMessage: true },
        {
          id: 2,
          text: 'Привет! Все отлично, работаю. А у тебя?',
          timestamp: '2023-10-01T18:05:00Z',
          isMyMessage: false
        },
        {
          id: 3,
          text: 'Тоже работаю, но уже устал. Думаю, скоро сделаю перерыв.',
          timestamp: '2023-10-01T18:10:00Z',
          isMyMessage: true
        },
        {
          id: 4,
          text: 'Понятно. Может, прогуляешься? Это помогает отдохнуть.',
          timestamp: '2023-10-01T18:15:00Z',
          isMyMessage: false
        },
        {
          id: 5,
          text: 'Хорошая идея! Спасибо за совет.',
          timestamp: '2023-10-01T18:20:00Z',
          isMyMessage: true
        }
      ],
      newMessageText: ''
    },
    {
      id: 10,
      nickname: 'user10',
      avatar: 'https://example.com/avatar10.jpg',
      messages: [
        { id: 1, text: 'Привет! Что делаешь?', timestamp: '2023-10-01T19:00:00Z', isMyMessage: true },
        {
          id: 2,
          text: 'Привет! Ничего особенного, работаю. А у тебя?',
          timestamp: '2023-10-01T19:05:00Z',
          isMyMessage: false
        },
        {
          id: 3,
          text: 'Я тоже работаю, но планирую на выходные выбраться куда-нибудь.',
          timestamp: '2023-10-01T19:10:00Z',
          isMyMessage: true
        },
        {
          id: 4,
          text: 'Здорово! Куда думаешь поехать?',
          timestamp: '2023-10-01T19:15:00Z',
          isMyMessage: false
        },
        {
          id: 5,
          text: 'Пока не решил, может, в горы или на озеро.',
          timestamp: '2023-10-01T19:20:00Z',
          isMyMessage: true
        }
      ],
      newMessageText: ''
    }
  ]
}

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case DispatchConst.ADD_MESSAGE:
      console.log('ADD_MESSAGE')
      return {
        ...state,
        chats: state.chats.map((chat) =>
          chat.id === action.idOfUser
            ? {
              ...chat,
              messages: [...chat.messages, action.newMessage], // Добавляем новое сообщение
            }
            : chat
        ),
      };
    case DispatchConst.NEW_MESSAGE_TEXT:
      console.log('NEW_MESSAGE_TEXT')
      return {
        ...state,
        chats: state.chats.map((chat) =>
          chat.id === action.idOfUser
            ? {
              ...chat,
              newMessageText: action.newMessageText, // Обновляем текст нового сообщения
            }
            : chat
        ),
      };
    default:
      return state;
  }
}

export const addMessageActionCreator = (newMessage, idOfUser) =>
  ({ type: DispatchConst.ADD_MESSAGE, idOfUser: idOfUser, newMessage: newMessage })

export const newMessageTextActionCreator = (newMessageText, idOfUser) =>
  ({ type: DispatchConst.NEW_MESSAGE_TEXT, idOfUser: idOfUser, newMessageText: newMessageText })


export default dialogsReducer