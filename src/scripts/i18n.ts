// Рядки для клієнтських скриптів. Мова береться з <html lang>.
export type CLang = 'en' | 'uk';
export const clang = (): CLang => (document.documentElement.lang === 'uk' ? 'uk' : 'en');
export const cprefix = () => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${clang() === 'uk' ? '/uk' : ''}`;

const en = {
  signIn: 'Sign in', admin: 'Admin', account: 'My account',
  roles: { user: 'Registered user', member: 'Club member', editor: 'Editor', admin: 'Admin' } as Record<string, string>,
  commentPending: 'Comment sent. It will appear after moderation.', commentPublished: 'Comment published.', moderation: 'pending moderation',
  fromAdmin: 'new', notFound: 'Post not found', notFoundText: 'It may have been unpublished.', loading: 'Loading…',
  addedInAdmin: 'Also scheduled',
  rsvpYes: 'You are going. Cancel', rsvpGo: 'I’m going', rsvpMembers: 'RSVP is available to club members after signing in.', rsvpSaved: 'Saved. Thank you!',
  photoOf: (i: number, n: number) => `Photo ${i} of ${n}`,
  reviewThanks: 'Thank you! Your review will appear after moderation.', reviewInvalid: 'Please add your name and review text.',
  formInvalid: 'Fill in all fields and agree to data processing.', joinSent: 'Request sent. The club secretary will reply soon.', contactSent: 'Message sent. We will reply by email.',
  sendError: 'Could not send. Please try again or write to us by email.',
  copied: 'Copied', copyFail: 'Could not copy', copy: 'Copy', copyText: 'Copy text',
  current: 'Signed in as', signOut: 'Sign out',
  linkSent: (e: string) => `We sent a sign-in link to ${e}. Open it on this device. The link is valid for one hour.`,
  linkError: 'Could not send the link. Check the address or try again in a minute.',
  profileSaved: 'Profile saved.', uploadSent: (n: number) => `${n} photo(s) sent for moderation.`, uploading: 'Uploading…', uploadError: 'Upload failed. Try a JPG or PNG up to 10 MB.',
  needMember: 'You are registered. Club members get access to member features after an admin confirms your membership.',
  kinds: { partner: 'Partner', beneficiary: 'Beneficiary', volunteer: 'Volunteer', guest: 'Guest' } as Record<string, string>,
  a: {
    signedInAs: 'Signed in as', pending: 'Pending moderation', posts: 'News', events: 'Upcoming events', requests: 'Requests',
    nothing: 'Nothing has changed yet.', published: 'published', draft: 'draft', edit: 'Edit', view: 'View on site', del: 'Delete', sure: 'Delete for sure?',
    postsEmpty: 'No news yet.', eventsEmpty: 'No events yet.', membersOnly: ', members only', timeTbc: ', time to be confirmed',
    st: { pending: 'pending', approved: 'published', hidden: 'hidden', private: 'private to the board' } as Record<string, string>,
    to: 'on', publish: 'Publish', hide: 'Hide', toBoard: 'Send privately to the board', noConsent: 'no consent to publish',
    commentsEmpty: 'No comments.', reviewsEmpty: 'No reviews.', photosEmpty: 'No photos.', join: 'wants to join', contact: 'contact', requestsEmpty: 'No requests yet.',
    auditEmpty: 'The log is empty.', addTitle: 'Add a title in at least one language.', publishedMsg: 'Published.', seeNews: 'See it in News', draftSaved: 'Draft saved.',
    eventSaved: 'Event saved.', openSchedule: 'Open the schedule', inviteSaved: (e: string) => `Invitation saved. When ${e} signs in, the role is applied automatically.`,
    newPost: 'New post', editing: 'Editing', newEvent: 'New event', editingEvent: 'Editing event', roleOf: 'Role', you: 'you', saved: 'Saved.', error: 'Error',
    liveNote: 'Changes appear on news and events lists right away; full pages update within 30 minutes.',
    album: 'Album',
  },
};
type D = typeof en;
const uk: D = {
  signIn: 'Увійти', admin: 'Адмінка', account: 'Кабінет',
  roles: { user: 'Зареєстрований користувач', member: 'Член клубу', editor: 'Редактор', admin: 'Адмін' },
  commentPending: 'Коментар надіслано. Він з’явиться після модерації.', commentPublished: 'Коментар опубліковано.', moderation: 'на модерації',
  fromAdmin: 'нове', notFound: 'Пост не знайдено', notFoundText: 'Можливо, його зняли з публікації.', loading: 'Завантаження…',
  addedInAdmin: 'Також у розкладі',
  rsvpYes: 'Ви записані. Скасувати', rsvpGo: 'Я буду', rsvpMembers: 'RSVP доступний членам клубу після входу.', rsvpSaved: 'Збережено. Дякуємо!',
  photoOf: (i: number, n: number) => `Фото ${i} з ${n}`,
  reviewThanks: 'Дякуємо! Відгук з’явиться після модерації.', reviewInvalid: 'Вкажіть ім’я і текст відгуку.',
  formInvalid: 'Заповніть усі поля і дайте згоду на обробку даних.', joinSent: 'Заявку надіслано. Секретар клубу скоро відповість.', contactSent: 'Повідомлення надіслано. Відповімо на email.',
  sendError: 'Не вдалося надіслати. Спробуйте ще раз або напишіть нам на email.',
  copied: 'Скопійовано', copyFail: 'Не вдалося скопіювати', copy: 'Скопіювати', copyText: 'Скопіювати текст',
  current: 'Ви увійшли як', signOut: 'Вийти',
  linkSent: (e: string) => `Ми надіслали посилання для входу на ${e}. Відкрийте його на цьому пристрої. Посилання діє одну годину.`,
  linkError: 'Не вдалося надіслати посилання. Перевірте адресу або спробуйте за хвилину.',
  profileSaved: 'Профіль збережено.', uploadSent: (n: number) => `${n} фото надіслано на модерацію.`, uploading: 'Завантаження…', uploadError: 'Не вдалося завантажити. Спробуйте JPG або PNG до 10 МБ.',
  needMember: 'Ви зареєстровані. Доступ до можливостей для членів клубу з’явиться, коли адмін підтвердить членство.',
  kinds: { partner: 'Партнер', beneficiary: 'Отримувач допомоги', volunteer: 'Волонтер', guest: 'Гість' },
  a: {
    signedInAs: 'Ви увійшли як', pending: 'На модерації', posts: 'Новин', events: 'Майбутніх подій', requests: 'Заявок',
    nothing: 'Ще нічого не змінювали.', published: 'опубліковано', draft: 'чернетка', edit: 'Редагувати', view: 'Переглянути на сайті', del: 'Видалити', sure: 'Точно видалити?',
    postsEmpty: 'Новин ще немає.', eventsEmpty: 'Подій ще немає.', membersOnly: ', для членів клубу', timeTbc: ', час уточнюється',
    st: { pending: 'чекає', approved: 'опубліковано', hidden: 'приховано', private: 'приватно правлінню' },
    to: 'до', publish: 'Опублікувати', hide: 'Приховати', toBoard: 'Передати правлінню приватно', noConsent: 'без згоди на публікацію',
    commentsEmpty: 'Коментарів немає.', reviewsEmpty: 'Відгуків немає.', photosEmpty: 'Фото немає.', join: 'хоче долучитися', contact: 'контакт', requestsEmpty: 'Заявок ще немає.',
    auditEmpty: 'Журнал порожній.', addTitle: 'Додайте заголовок хоча б однією мовою.', publishedMsg: 'Опубліковано.', seeNews: 'Подивитися в новинах', draftSaved: 'Чернетку збережено.',
    eventSaved: 'Подію збережено.', openSchedule: 'Відкрити розклад', inviteSaved: (e: string) => `Запрошення збережено. Коли ${e} увійде, роль застосується автоматично.`,
    newPost: 'Нова публікація', editing: 'Редагування', newEvent: 'Нова подія', editingEvent: 'Редагування події', roleOf: 'Роль', you: 'ви', saved: 'Збережено.', error: 'Помилка',
    liveNote: 'Зміни одразу видно в списках новин і подій; повні сторінки оновлюються протягом 30 хвилин.',
    album: 'Альбом',
  },
};
export const ct = () => (clang() === 'uk' ? uk : en);
export const cfmt = (iso: string, o: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }) =>
  new Intl.DateTimeFormat(clang() === 'uk' ? 'uk-UA' : 'en-GB', { timeZone: 'Europe/Kyiv', ...o }).format(new Date(iso));
