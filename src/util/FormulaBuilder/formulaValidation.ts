export function validateFormulaExp(formula: string): boolean {
  // Allowed characters: alphabetic characters, operators, and parentheses
  const allowedCharacters = /^[a-zA-Z+\-*/%\s()]+$/;

  // Check if the formula contains only allowed characters
  if (!allowedCharacters.test(formula)) {
    return false;
  }

  // Remove whitespace for further checks
  formula = formula.replace(/\s+/g, "");

  // Check for balanced parentheses
  const parenthesesStack: string[] = [];
  for (const char of formula) {
    if (char === "(") {
      parenthesesStack.push(char);
    } else if (char === ")") {
      if (parenthesesStack.length === 0) {
        return false; // Unmatched closing parenthesis
      }
      parenthesesStack.pop();
    }
  }
  if (parenthesesStack.length !== 0) {
    return false; // Unmatched opening parenthesis
  }

  // Check for correct token order using a state machine
  enum State {
    Start,
    Operand,
    Operator,
    OpenParenthesis,
    CloseParenthesis,
    End,
  }

  let state = State.Start;
  for (let i = 0; i < formula.length; i++) {
    const char = formula[i];
    switch (state) {
    case State.Start:
      if (char.match(/[a-zA-Z]/)) {
        state = State.Operand;
      } else if (char === "(") {
        state = State.OpenParenthesis;
      } else {
        return false; // Invalid start character
      }
      break;
    case State.Operand:
      if (char.match(/[a-zA-Z]/)) {
        // Stay in the operand state
      } else if ("+-*/%".includes(char)) {
        state = State.Operator;
      } else if (char === "(") {
        return false;
      } else if (char === ")") {
        state = State.CloseParenthesis;
      } else {
        return false; // Invalid character after operand
      }
      break;
    case State.Operator:
      if (char.match(/[a-zA-Z]/)) {
        state = State.Operand;
      } else if (char === "(") {
        state = State.OpenParenthesis;
      } else {
        return false; // Invalid character after operator
      }
      break;
    case State.OpenParenthesis:
      if (char.match(/[a-zA-Z]/)) {
        state = State.Operand;
      } else if (char === "(") {
        // Stay in the open parenthesis state
      } else {
        return false; // Invalid character after open parenthesis
      }
      break;
    case State.CloseParenthesis:
      if ("+-*/%".includes(char)) {
        state = State.Operator;
      } else if (char === ")") {
        // Stay in the close parenthesis state
      } else {
        return false; // Invalid character after close parenthesis
      }
      break;
    default:
      return false; // Invalid state
    }
  }

  // Valid end states are Operand or CloseParenthesis
  return state === State.Operand || state === State.CloseParenthesis;
}
