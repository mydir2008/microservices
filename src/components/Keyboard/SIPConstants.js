/**
 * Constants Define
 * NOTE: Don't modify, otherwise keyboard will not load normally.
 * copyright: CFCA
 * auther: mayuchuan
 * time:23/05/2018
 */

export const HTML5_SIP_VERSION = "4.0.1.3";

export const DEFAULT_MIN_LENGTH = 6;
export const DEFAULT_MAX_LENGTH = 8;

export const CIPHER_TYPE_RSA = 1;
export const CIPHER_TYPE_SM2 = 0;

export const OUTPUT_TYPE_HASH = 1;
export const OUTPUT_TYPE_ORIGINAL = 2;

export const CIPHER_DISPLAY = 0;
export const PLAINTEXT_DISPLAY = 1;

export const KEYBOARD_TYPE_NUMBER = 0;
export const KEYBOARD_TYPE_COMPLETE = 1;

export const KEYBOARD_TYPE_SYMBOL = 2; /** don't support */

export const INPUTCONTENTCHANGETYPE_INSERT = 0;
export const INPUTCONTENTCHANGETYPE_DELETE = 1;

export const DISORDER_TYPE_NONE = 0;
export const DISORDER_TYPE_DIGITAL_ONLY = 1;
export const DISORDER_TYPE_ALL = 2;

export const REG_NUMBER = "[0-9]+";
export const REG_LETTERS_LOW = "[a-z]+";
export const REG_LETTERS_UP = "[A-Z]+";
export const REG_SYMBOLS = "[^A-Za-z0-9]+";

export const NUMBERREG = 1;
export const LETTERLOWREG = 2;
export const LETTERUPREG = 3;
export const SYMBOLSREG = 4;

export const FINISH_KEY_TEXT = "\u5b8c\u6210"; //完成unicode码

export const CFCA_OK = 0;
/*4097*/
export const CFCA_ERROR_INVALID_PARAMETER = 0x1001;
/*4098*/
export const CFCA_ERROR_INVALID_SIP_HANDLE_ID = 0x1002;
/*4099*/
export const CFCA_ERROR_INPUT_LENGTH_OUT_OF_RANGE = 0x1003;
/*4100*/
export const CFCA_ERROR_INPUT_VALUE_IS_NULL = 0x1004;
/*4101*/
export const CFCA_ERROR_SERVER_RANDOM_INVALID = 0x1005;
/*4102*/
export const CFCA_ERROR_SERVER_RANDOM_IS_NULL = 0x1006;
/*4103*/
export const CFCA_ERROR_INPUT_VALUE_OR_SERVER_RANDOM_TOO_LONG = 0x1007;
/*4104*/
export const CFCA_ERROR_INPUT_VALUE_NOT_MATCH_REGEX = 0x1008;
/*4105*/
export const CFCA_ERROR_PUBLIC_KEY_INVALID = 0x1009;
/*4106*/
export const CFCA_ERROR_PUBLIC_KEY_IS_NULL = 0x100A;
/*4107*/
export const CFCA_ERROR_RSA_ENCRYPT_FAILED = 0x100B;
/*4108*/
export const CFCA_ERROR_NOT_MATCH_INPUT_REGEX = 0x100C;
/*4109*/
export const CFCA_ERROR_SERVER_RANDOM_TOO_SHORT = 0x100D;
/*4110*/
export const CFCA_ERROR_SERVER_RANDOM_WITH_INPUT = 0x100E;
/*4111*/
export const CFCA_ERROR_SM2_ENCRYPT_FAILED = 0x100F;
/*4112*/
export const CFCA_ERROR_CIPHER_TYPE = 0x1010;
/*4113*/
export const CFCA_ERROR_ENCRYPTED_FAILED = 0x1011;
/*4114*/
export const CFCA_ERROR_DECRYPTED_FAILED = 0x1012;
