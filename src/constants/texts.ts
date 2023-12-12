export const textKeys = [
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
  "CHARACTERS_6_TO_20",
  "PAGE_NOT_FOUND",
  "ADD",
  "AMOUNT",
  "BUDGET",
  "DELETE",
  "ENTER_AMOUNT",
  "FIX_PAYMENT",
  "CHANGE_BUDGET_MESSAGE",
  "CHANGE_BUDGET",
  "NO_PAYMENT_DATA",
  "REMAINING",
  "TOTAL_SPENDING",
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
  "INVALID_ACTION_CODE",
  "EXPIRED_ACTION_CODE",
] as const;

export type TextKeys = (typeof textKeys)[number];

type Text = { en: string; ja: string };

export type Texts = {
  [key in TextKeys]: string;
};

export const texts: {
  [key in TextKeys]: Text;
} = {
  // auth
  CHANGE: {
    en: "Change",
    ja: "変更",
  },
  CHANGE_PASSWORD: {
    en: "Change password",
    ja: "パスワード変更",
  },
  CREATE_ACCOUNT: {
    en: "Create account",
    ja: "アカウント作成",
  },
  CURRENT_PASSWORD: {
    en: "Current password",
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
    en: "New password",
    ja: "新しいパスワード",
  },
  REENTER_NEW_PASSWORD: {
    en: "Reenter new password",
    ja: "新しいパスワードを再入力",
  },
  REENTER_PASSWORD: {
    en: "Renter password",
    ja: "パスワードを再入力",
  },
  RESEND: {
    en: "Resend",
    ja: "再送信",
  },
  RESEND_RESET_LINK: {
    en: "Resend reset link",
    ja: "再設定リンクをもう一度送信",
  },
  RESET: {
    en: "Reset",
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
    en: "Send",
    ja: "送信",
  },
  SIGN_IN: {
    en: "Sign in",
    ja: "サインイン",
  },
  SIGN_OUT: {
    en: "Sign out",
    ja: "サインアウト",
  },
  SIGN_UP: {
    en: "Sign up",
    ja: "新規登録",
  },
  // error
  ONLY_ALPHANUMERIC_CHARACTERS: {
    en: "Only alphanumeric characters",
    ja: "半角英数字のみ使用できます。",
  },
  CHARACTERS_6_TO_20: {
    en: "Use 6 to 20 characters",
    ja: "6から20文字で入力してください。",
  },
  PAGE_NOT_FOUND: {
    en: "We're Sorry, The page you requested could not be found.",
    ja: "申し訳ございません。お探しのページは見つかりませんでした。",
  },
  // home
  ADD: {
    en: "Add",
    ja: "追加",
  },
  AMOUNT: {
    en: "Amount",
    ja: "金額",
  },
  BUDGET: {
    en: "Budget",
    ja: "予算",
  },
  DELETE: {
    en: "Delete",
    ja: "削除",
  },
  ENTER_AMOUNT: {
    en: "Enter amount",
    ja: "支出額を入力",
  },
  FIX_PAYMENT: {
    en: "Fix data",
    ja: "支払データ修正",
  },
  CHANGE_BUDGET_MESSAGE: {
    en: "What is your budget for",
    ja: "の予算はいくらですか",
  },
  CHANGE_BUDGET: {
    en: "Change budget",
    ja: "予算変更",
  },
  NO_PAYMENT_DATA: {
    en: "No payment data",
    ja: "支払いデータがありません。",
  },
  REMAINING: {
    en: "Remaining",
    ja: "残高",
  },
  TOTAL_SPENDING: {
    en: "Total Spending",
    ja: "支出合計",
  },
  SPENT_DATE: {
    en: "Spent date",
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
    ja: "ホームへ戻る",
  },
  // lp
  START_BUDGETING: {
    en: "Start budgeting",
    ja: "予算管理を始める",
  },
  LP_TEXT_01: {
    en: "Keep your household finances in check with real-time budget tracking.",
    ja: "毎月の予算管理をシンプルに",
  },
  LP_TEXT_02: {
    en: "Are you managing your monthly budget effectively?",
    ja: "月の予算管理、しっかりできていますか？",
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
    en: "How to use",
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
    en: "Password changed",
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
    en: "An unexpected error occurred. Please try again later.",
    ja: "不明なエラーが発生しました。",
  },
  USER_DISABLED: {
    en: "Account not available.",
    ja: "アカウントが無効になっています。",
  },
  INVALID_EMAIL: {
    en: "Invalid email format.",
    ja: "メールアドレス形式が正しくありません。",
  },
  EMAIL_ALREADY_IN_USE: {
    en: "This email address is already in use.",
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
    ja: "リクエスト回数が上限に達しました。時間をおいてお試しください。",
  },
  ENTER_YOUR_EMAIL_ADDRESS: {
    en: "Enter your email address.",
    ja: "メールアドレスを入力してください。",
  },
  EMAIL_ALREADY_USE: {
    en: "Sorry, this email address is already in use. Please try signing in or use a different email address to create a new account.",
    ja: "このメールアドレスは既に使用されています。お手数ですが、サインインするか、別のメールアドレスで新規登録して下さい。",
  },
  WEAK_PASSWORD: {
    en: "Oops, password needs to be between 6 to 20 characters. Please try again with a password that meets this requirement.",
    ja: "パスワードは6から20文字で入力してください。",
  },
  INVALID_ACTION_CODE: {
    en: "Oops, this password reset link is invalid. Please make sure you copied the link correctly or request a new one to reset your password.",
    ja: "無効な再設定リンクです。お手数ですが、正しくリンクをコピーしたか確認するか、パスワード再設定リンクを再度リクエストして下さい。",
  },
  EXPIRED_ACTION_CODE: {
    en: "Sorry, this password reset link has expired. Please request a new one to reset your password.",
    ja: "パスワード再設定リンクの有効期限が切れています。お手数ですが、パスワード再設定リンクを再度リクエストして下さい。",
  },
};

export const englishText: Texts = {} as Texts;
export const japaneseText: Texts = {} as Texts;

for (const key of textKeys) {
  englishText[key] = texts[key].en;
  japaneseText[key] = texts[key].ja;
}
