import { TokenType } from "./tokenType";

interface Token {
  type: TokenType;
  lexeme: string;
  literal: object;
  line: number;
}

export function createToken(
  type: TokenType,
  lexeme: string,
  literal: object,
  line: number
) {
  const token = {
    type: type,
    lexeme: lexeme,
    literal: literal,
    line: line,
  };

  return token;
}

export function printToken(token: Token) {
  return `${token.type} ${token.lexeme} ${token.literal}`;
}
