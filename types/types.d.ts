declare namespace Cypress {
  interface Chainable<Subject> {
    signIn(email: string, password: string): void;
    task(event: 'db:rest'): Chainable<string>;
  }
}


declare module '*module.css' {
  const styles: {
    [className: string]: string;
  };
  export default styles;
}
