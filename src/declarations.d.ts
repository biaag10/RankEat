// permite que o typescript entenda como lidar com arquivos .png e .css ao importá-los

declare module "*.png" {
    const value: string;
    export default value;
  }
  
  declare module "*.css" {
    const value: string;
    export default value;
  }
  