export interface SearchBarProps {
  placeholder?: string;
  borderFocus?:boolean
  onEnter?():void
  value:string
  setValue(value:string):void
}