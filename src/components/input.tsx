import React from "react";
import { styled } from "styled-components";

// styleSheet = 'input' | 'datePicker' | 'select';
// tipo generico????? keyof styleSheet
// switch = 'input' ==> sheetInput
// switch = 'datePicker' ==> sheetDatePicker
// switch = 'select' ==> sheetSelect


interface Variant {
    tag: keyof JSX.IntrinsicElements;
    textAlign: string;
    color: string;
    borderRadius: string;
    height: string;
    maxWidth: string;
    backgroundColor: string;
    boxShadow: string;
    borderTop: string;
    borderLeft: string;
    borderBottom: string;
    borderRight: string;
    outline?: 'none';
};

const variantsType = <T extends { [p: string]: Variant }> (x: T) => x;

const variants = variantsType({
  Input: {
    tag: "input",
    textAlign: "left",
    borderRadius: '10px',
    height: '20px',
    maxWidth: '200px',
    backgroundColor: 'black',
    color: 'white',
    boxShadow: '4px 4px 4px 0px black',
    borderTop: 'none',
    borderLeft: 'none',
    borderBottom: 'none',
    borderRight: 'none',
  },
  InputForm: {
    tag: "input",
    textAlign: "left",
    borderRadius: '24px',
    height: '80px',
    maxWidth: '574px',
    backgroundColor: 'white',
    color: 'black',
    boxShadow: '0px 4px 4px 0px gray',
    borderTop: 'none',
    borderLeft: '1px solid gray',
    borderBottom: '1px solid gray',
    borderRight: '1px solid gray',
  },
  InputFormUser: {
    tag: "input",
    textAlign: "left",
    borderRadius: '24px',
    height: '40px',
    maxWidth: '100px',
    backgroundColor: 'gray',
    color: 'black',
    boxShadow: '0px 4px 4px 0px black',
    borderTop: 'none',
    borderLeft: '1px solid gray',
    borderBottom: '1px solid gray',
    borderRight: '1px solid gray',
  },
  InputFocus: {
    tag: "input",
    textAlign: "left",
    borderRadius: '24px',
    height: '40px',
    maxWidth: '100px',
    backgroundColor: 'gray',
    color: 'black',
    boxShadow: '0px 4px 4px 0px black',
    borderTop: 'none',
    borderLeft: '1px solid gray',
    borderBottom: '1px solid gray',
    borderRight: '1px solid gray',
    outline: 'none',
  },
  InputEstudioPlaza: {
    tag: "input",
    textAlign: "center",
    borderRadius: '24px',
    height: '20px',
    maxWidth: '250px',
    backgroundColor: 'white',
    color: 'black',
    boxShadow: '0px 4px 4px 0px gray',
    borderTop: 'none',
    borderLeft: '1px solid gray',
    borderBottom: '1px solid gray',
    borderRight: '1px solid gray',
    outline: 'none',
  }
});

interface StyledInputs {
    variant: keyof typeof variants;
    customStyle?: React.CSSProperties;
};


const Input = styled.input.attrs<StyledInputs>(({ variant }) => ({as: variants[variant].tag }))<StyledInputs>`
    text-align: ${({ variant }) => variants[variant].textAlign};
    border-radius: ${({ variant }) => variants[variant].borderRadius};
    height: ${({ variant }) => variants[variant].height};
    color:  ${({ variant }) => variants[variant].color};
    max-width: ${({ variant }) => variants[variant].maxWidth};
    background-color: ${({ variant }) => variants[variant].backgroundColor};
    box-shadow: ${({ variant }) => variants[variant].boxShadow};
    border-top: ${({ variant }) => variants[variant].borderTop};
    border-left: ${({ variant }) => variants[variant].borderLeft};
    border-bottom: ${({ variant }) => variants[variant].borderBottom};
    border-right: ${({ variant }) => variants[variant].borderRight};
    outline: ${({ variant }) => (variant === 'InputFocus' as string) ? variants['InputFocus'].outline : 'none'};



    &:focus {
      /* border: ${({ variant }) => (variant === 'InputFocus' as string) ? variants[variant].height : 'none'}; */

      /* border: none; */
      /* height: ${({ variant }) => variants[variant].height}; */
    }
`


export const CustomInput = ({variant, customStyle, ...props}: StyledInputs & React.InputHTMLAttributes<HTMLInputElement>) => {

  return(
    <Input variant={variant} style={{...customStyle} } {...props} />
  )
};
