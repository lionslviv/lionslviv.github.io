// Рядки для клієнтських скриптів. Мова береться з <html lang>.
export type CLang = 'en' | 'uk';
export const clang = (): CLang => (document.documentElement.lang === 'uk' ? 'uk' : 'en');
export const cprefix = () => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${clang() === 'uk' ? '/uk' : ''}`;

const en = {
  signIn: 'Sign in', admin: 'Admin', account: 'My account',
  roles: { user: 'User', member: 'Club member', editor: 'Editor', admin: 'Admin' },
  demoUser: '(demo)',
  commentPending: 'Comment sent. It will appear after moderation.', commentPublished: 'Comment published.', moderation: 'pending moderation',
  fromAdmin: 'just published', notFound: 'Post not found', notFoundText: 'It may have been deleted in the admin panel or opened in another browser.', loading: 'Loading…',
  addedInAdmin: 'Added in the admin panel', demo: 'demo',
  rsvpYes: 'You are going. Cancel', rsvpGo: 'I’m going', rsvpMembers: 'RSVP is available to club members. Sign in as a club member (demo).', rsvpSaved: 'Saved. A reminder email arrives 24 hours before the meeting (in production).',
  photoOf: (i: number, n: number) => `Photo ${i} of ${n}`,
  reviewThanks: 'Thank you! Your review will appear after moderation.', reviewInvalid: 'Please add your name and review text.',
  formInvalid: 'Fill in all fields and agree to data processing.', joinSent: 'Request sent. The club secretary will reply within a week.', contactSent: 'Message sent. We will reply by email.',
  copied: 'Copied', copyFail: 'Could not copy', copy: 'Copy', copyText: 'Copy text',
  current: 'Signed in as', signOut: 'Sign out',
  profileSaved: 'Profile saved.', uploadSent: (n: number) => `${n} photo(s) sent for moderation (demo: files are not uploaded).`,
  kinds: { partner: 'Partner', beneficiary: 'Beneficiary', volunteer: 'Volunteer', guest: 'Guest' } as Record<string, string>,
  a: {
    signedInAs: 'Signed in as', pending: 'Pending', posts: 'Posts from admin', events: 'Events added', requests: 'Requests',
    nothing: 'Nothing has changed yet.', published: 'published', draft: 'draft', edit: 'Edit', view: 'View on site', del: 'Delete', sure: 'Delete for sure?',
    postsEmpty: 'News created in the admin panel will appear here.', eventsEmpty: 'No events added in the admin panel yet.', membersOnly: ', members only',
    st: { pending: 'pending', approved: 'published', hidden: 'hidden', private: 'private to the board' } as Record<string, string>,
    to: 'on', publish: 'Publish', hide: 'Hide', toBoard: 'Send privately to the board', noConsent: 'no consent to publish',
    commentsEmpty: 'No comments.', reviewsEmpty: 'No reviews.', join: 'wants to join', contact: 'contact', requestsEmpty: 'No requests yet. Try the form on the Join page.',
    auditEmpty: 'The log is empty.', addTitle: 'Add a title.', publishedMsg: 'Published.', seeNews: 'See it in News', draftSaved: 'Draft saved.',
    eventAdded: 'Event added.', openSchedule: 'Open the schedule', invite: (e: string) => `Invitation sent to ${e} (in production via Supabase Auth).`,
    newPost: 'New post', editing: 'Editing', roleOf: 'Role',
    roster: [['Club President', 'admin'], ['Club Secretary', 'editor'], ['Communications Chair', 'editor'], ['Club member', 'member'], ['Site guest (demo)', 'user']] as [string, string][],
  },
};
type D = typeof en;
const uk: D = {
  signIn: 'Увійти', admin: 'Адмінка', account: 'Кабінет',
  roles: { user: 'Користувач', member: 'Член клубу', editor: 'Редактор', admin: 'Адмін' },
  demoUser: '(демо)',
  commentPending: 'Коментар надіслано. Він з’явиться після модерації.', commentPublished: 'Коментар опубліковано.', moderation: 'на модерації',
  fromAdmin: 'щойно з адмінки', notFound: 'Пост не знайдено', notFoundText: 'Можливо, його видалили в адмінці або відкрито в іншому браузері.', loading: 'Завантаження…',
  addedInAdmin: 'Додано в адмінці', demo: 'демо',
  rsvpYes: 'Ви записані. Скасувати', rsvpGo: 'Я буду', rsvpMembers: 'RSVP доступний членам клубу. Увійдіть як член клубу (демо).', rsvpSaved: 'Відповідь збережено. За 24 години до зборів прийде нагадування на email (у продакшні).',
  photoOf: (i: number, n: number) => `Фото ${i} з ${n}`,
  reviewThanks: 'Дякуємо! Відгук з’явиться після модерації.', reviewInvalid: 'Вкажіть ім’я і текст відгуку.',
  formInvalid: 'Заповніть усі поля і дайте згоду на обробку даних.', joinSent: 'Заявку надіслано. Секретар клубу відповість протягом тижня.', contactSent: 'Повідомлення надіслано. Відповімо на email.',
  copied: 'Скопійовано', copyFail: 'Не вдалося скопіювати', copy: 'Скопіювати', copyText: 'Скопіювати текст',
  current: 'Зараз ви', signOut: 'Вийти',
  profileSaved: 'Профіль збережено.', uploadSent: (n: number) => `${n} фото надіслано на модерацію (демо: файли не завантажуються).`,
  kinds: { partner: 'Партнер', beneficiary: 'Отримувач допомоги', volunteer: 'Волонтер', guest: 'Гість' },
  a: {
    signedInAs: 'Ви увійшли як', pending: 'На модерації', posts: 'Публікацій з адмінки', events: 'Подій додано', requests: 'Заявок',
    nothing: 'Ще нічого не змінювали.', published: 'опубліковано', draft: 'чернетка', edit: 'Редагувати', view: 'Переглянути на сайті', del: 'Видалити', sure: 'Точно видалити?',
    postsEmpty: 'Тут з’являться новини, створені в адмінці.', eventsEmpty: 'Подій, доданих в адмінці, ще немає.', membersOnly: ', для членів клубу',
    st: { pending: 'чекає', approved: 'опубліковано', hidden: 'приховано', private: 'приватно правлінню' },
    to: 'до', publish: 'Опублікувати', hide: 'Приховати', toBoard: 'Передати правлінню приватно', noConsent: 'без згоди на публікацію',
    commentsEmpty: 'Коментарів немає.', reviewsEmpty: 'Відгуків немає.', join: 'хоче долучитися', contact: 'контакт', requestsEmpty: 'Заявок ще немає. Спробуйте форму на сторінці «Приєднатися».',
    auditEmpty: 'Журнал порожній.', addTitle: 'Додайте заголовок.', publishedMsg: 'Опубліковано.', seeNews: 'Подивитися в новинах', draftSaved: 'Чернетку збережено.',
    eventAdded: 'Подію додано.', openSchedule: 'Відкрити розклад', invite: (e: string) => `Запрошення для ${e} надіслано (у робочій версії лист прийде через Supabase Auth).`,
    newPost: 'Нова публікація', editing: 'Редагування', roleOf: 'Роль',
    roster: [['Президент клубу', 'admin'], ['Секретар клубу', 'editor'], ['Координатор комунікацій', 'editor'], ['Член клубу', 'member'], ['Гість сайту (демо)', 'user']],
  },
};
export const ct = () => (clang() === 'uk' ? uk : en);
export const cfmt = (iso: string, o: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }) =>
  new Intl.DateTimeFormat(clang() === 'uk' ? 'uk-UA' : 'en-GB', o).format(new Date(iso));
