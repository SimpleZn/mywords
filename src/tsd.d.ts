declare module '*.scss';
declare module '*.sass';
declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>
  ): React.ReactElement;
  const content: any;
  export default content;
}