declare module '*.png' {
    const content: string;
    export default content;
  }
  declare module '*.svg' {
    const content: any; // You can use `string` or `any` based on your needs
    export default content;
  }
  declare module '*.gif' {
    const content: any; // You can use `string` or `any` based on your needs
    export default content;
  }