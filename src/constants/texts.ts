const textKeys = [
  "CHANGE",
  "CHANGE_PASSWORD",
  "CREATE_ACCOUNT",
  "CURRENT_PASSWORD",
  "EMAIL_ADDRESS",
  "EMAIL_ADDRESS_PLACEHOLDER",
  "NEW_PASSWORD",
  "ENTER_PASSWORD",
  "REENTER_NEW_PASSWORD",
  "REENTER_PASSWORD",
  "RESEND",
  "RESEND_RESET_LINK",
  "RESET",
  "RESET_PASSWORD",
  "PASSWORD",
  "PASSWORD_PLACEHOLDER",
  "SEND",
  "SIGN_IN",
  "SIGN_OUT",
  "SIGN_UP",
  "ONLY_ALPHANUMERIC_CHARACTERS",
  "CHARACTERS_6_to_20",
  "PAGE_NOT_FOUND",
  "ADD",
  "AMOUNT",
  "BUDGET",
  "DELETE",
  "ENTER_AMOUNT",
  "FIX_AMOUNT",
  "NO_PAYMENT_DATA",
  "REMAINING",
  "SPENT",
  "SPENT_DATE",
  "ALREADY_HAVE_AN_ACCOUNT",
  "FORGET_PASSWORD",
  "NEW_REGISTRATION",
  "RETURN_TO_HOME",
  "START_BUDGETING",
  "LP_TEXT_01",
  "LP_TEXT_02",
  "LP_TEXT_03",
  "LP_TEXT_04",
  "HOW_TO_USE",
  "HOW_TO_USE_01",
  "HOW_TO_USE_02",
  "HOW_TO_USE_03",
  "PASSWORD_CHANGED",
  "PASSWORD_RESET_LINK_SENT",
  "ACCOUNT_NOT_FOUND",
  "UNKNOWN_ERROR",
  "USER_DISABLED",
  "INVALID_EMAIL",
  "EMAIL_ALREADY_IN_USE",
  "NOT_CORRECT_PASSWORD",
  "WRONG_PASSWORD",
  "TOO_MANY_REQUESTS",
  "ENTER_YOUR_EMAIL_ADDRESS",
  "EMAIL_ALREADY_USE",
  "WEAK_PASSWORD",
  "PROVIDER_ALREADY_LINKED",
  "INVALID_ACTION_CODE",
  "EXPIRED_ACTION_CODE",
] as const;

type TextKeys = (typeof textKeys)[number];

type Text = { en: string; ja: string };

export type Texts = {
  [key in TextKeys]: string;
};

export const texts: {
  [key in TextKeys]: Text;
} = {
  // auth
  CHANGE: {
    en: "change",
    ja: "変更",
  },
  CHANGE_PASSWORD: {
    en: "change password",
    ja: "パスワード変更",
  },
  CREATE_ACCOUNT: {
    en: "Create account",
    ja: "アカウント作成",
  },
  CURRENT_PASSWORD: {
    en: "Current Password",
    ja: "現在のパスワード",
  },
  EMAIL_ADDRESS: {
    en: "E-Mail address",
    ja: "メールアドレス",
  },
  EMAIL_ADDRESS_PLACEHOLDER: {
    en: "e.g. mail@example.com",
    ja: "例) mail@example.com",
  },
  NEW_PASSWORD: {
    en: "New Password",
    ja: "新しいパスワード",
  },
  REENTER_NEW_PASSWORD: {
    en: "Reenter New Password",
    ja: "新しいパスワードを再入力",
  },
  REENTER_PASSWORD: {
    en: "Renter Password",
    ja: "パスワードを再入力",
  },
  RESEND: {
    en: "resend",
    ja: "再送信",
  },
  RESEND_RESET_LINK: {
    en: "resend reset link",
    ja: "再設定リンクをもう一度送信",
  },
  RESET: {
    en: "reset",
    ja: "再設定",
  },
  RESET_PASSWORD: {
    en: "Reset password",
    ja: "パスワード再設定",
  },
  PASSWORD: {
    en: "Password",
    ja: "パスワード",
  },
  PASSWORD_PLACEHOLDER: {
    en: "e.g. password0000",
    ja: "例) password0000",
  },
  SEND: {
    en: "send",
    ja: "送信",
  },
  SIGN_IN: {
    en: "Sign In",
    ja: "サインイン",
  },
  SIGN_OUT: {
    en: "Sign Out",
    ja: "サインアウト",
  },
  SIGN_UP: {
    en: "Sign Up",
    ja: "サインアップ",
  },
  // error
  ONLY_ALPHANUMERIC_CHARACTERS: {
    en: "only alphanumeric characters",
    ja: "半角英数字のみ使用できます。",
  },
  CHARACTERS_6_to_20: {
    en: "use 6 to 20 characters",
    ja: "6から20文字で入力してください。",
  },
  PAGE_NOT_FOUND: {
    en: "We're Sorry, The page you requested could not be found.",
    ja: "申し訳ございません。お探しのページは見つかりませんでした。",
  },
  // home
  ADD: {
    en: "add",
    ja: "追加",
  },
  AMOUNT: {
    en: "amount",
    ja: "金額",
  },
  BUDGET: {
    en: "Budget",
    ja: "予算",
  },
  DELETE: {
    en: "delete",
    ja: "削除",
  },
  ENTER_AMOUNT: {
    en: "enter amount",
    ja: "支出額を入力",
  },
  FIX_AMOUNT: {
    en: "fix amount",
    ja: "支払データ修正",
  },
  NO_PAYMENT_DATA: {
    en: "No Payment Data",
    ja: "支払いデータがありません。",
  },
  REMAINING: {
    en: "Remaining",
    ja: "残高",
  },
  SPENT: {
    en: "Spent",
    ja: "支出",
  },
  SPENT_DATE: {
    en: "spent date",
    ja: "支払日",
  },
  // links
  ALREADY_HAVE_AN_ACCOUNT: {
    en: "Already have an account?",
    ja: "アカウントをお持ちの場合はこちら",
  },
  FORGET_PASSWORD: {
    en: "Forget password?",
    ja: "パスワードをお忘れの場合はこちら",
  },
  NEW_REGISTRATION: {
    en: "New registration",
    ja: "新規登録はこちら",
  },
  RETURN_TO_HOME: {
    en: "Return To Home",
    ja: "Homeへ戻る",
  },
  // lp
  START_BUDGETING: {
    en: "Start Budgeting",
    ja: "予算管理を始める",
  },
  LP_TEXT_01: {
    en: "simplify monthly budgeting",
    ja: "毎月の予算管理をシンプルに",
  },
  LP_TEXT_02: {
    en: "simplify monthly budgeting",
    ja: "毎月の予算管理をシンプルに",
  },
  LP_TEXT_03: {
    en: "Credit card statements take time to reflect, and it's difficult to determine how much you have spent since the beginning of the month.",
    ja: "クレジットカード明細は反映まで時間がかかってしまい、月初からいくら使ったのか把握するのは難しいですよね。",
  },
  LP_TEXT_04: {
    en: "With the budget management tool 'Pay History,' you can easily manage your monthly budget, track your spending, and monitor your budget balance.",
    ja: "予算管理ツール「PayHistory」なら、月の予算、支出額、予算の残高を最もシンプルに管理できます。",
  },
  HOW_TO_USE: {
    en: "How To Use",
    ja: "使い方",
  },
  HOW_TO_USE_01: {
    en: "Enter monthly budget.",
    ja: "月の予算を入力する",
  },
  HOW_TO_USE_02: {
    en: "When you make a payment, enter the amount in this app.",
    ja: "支払いしたらアプリで金額を入力",
  },
  HOW_TO_USE_03: {
    en: "Complete!",
    ja: "完了!",
  },
  // notification
  PASSWORD_CHANGED: {
    en: "password changed",
    ja: "パスワードを変更しました。",
  },
  PASSWORD_RESET_LINK_SENT: {
    en: "We have sent you a password reset link.",
    ja: "パスワードリセットリンクを送信しました。",
  },
  // error
  ENTER_PASSWORD: {
    en: "Enter password.",
    ja: "パスワードを入力して下さい。",
  },
  ACCOUNT_NOT_FOUND: {
    en: "Account not found.",
    ja: "アカウントが見つかりませんでした。",
  },
  UNKNOWN_ERROR: {
    en: "Unknown error.",
    ja: "不明なエラーが発生しました。",
  },
  USER_DISABLED: {
    en: "User disabled.",
    ja: "アカウントが無効になっています。",
  },
  INVALID_EMAIL: {
    en: "Invalid email format.",
    ja: "メールアドレス形式が正しくありません。",
  },
  EMAIL_ALREADY_IN_USE: {
    en: "Email already in use.",
    ja: "このメールアドレスは既に使用されています。",
  },
  NOT_CORRECT_PASSWORD: {
    en: "Password did not match.",
    ja: "パスワードが一致しませんでした。",
  },
  WRONG_PASSWORD: {
    en: "Wrong password.",
    ja: "パスワードが間違っています。",
  },
  TOO_MANY_REQUESTS: {
    en: "too many requests. please try again later.",
    ja: "所定の回数以上パスワードを間違えました。時間をおいてお試しください。",
  },
  ENTER_YOUR_EMAIL_ADDRESS: {
    en: "Enter your email address.",
    ja: "メールアドレスを入力してください。",
  },
  EMAIL_ALREADY_USE: {
    en: "This email address is already used.",
    ja: "このメールアドレスは既に使用されています。",
  },
  WEAK_PASSWORD: {
    en: "Weak password.",
    ja: "パスワードが脆弱です。6文字以上で入力してください。",
  },
  PROVIDER_ALREADY_LINKED: {
    en: "Provider already linked.",
    ja: "既にサインイン済みです。",
  },
  INVALID_ACTION_CODE: {
    en: "Invalid action code.",
    ja: "無効な再設定リンクです。",
  },
  EXPIRED_ACTION_CODE: {
    en: "Expired action code.",
    ja: "再設定リンクの有効期限が切れています。",
  },
};

export const englishText: Texts = {} as Texts;
export const japaneseText: Texts = {} as Texts;

for (const key of textKeys) {
  englishText[key] = texts[key].en;
  japaneseText[key] = texts[key].ja;
}
