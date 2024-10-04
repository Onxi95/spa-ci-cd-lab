import { yupResolver } from "@hookform/resolvers/yup";
import { styled } from "@mui/material";
import type { ReactNode } from "react";
import { FormProvider, useForm, type UseFormReturn } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  userName: yup
    .string()
    .required("This field is required")
    .min(1, "Minimum length is 1 character")
    .max(50, "Maximum length is 50 characters"),
});

type UserNameFormProps = {
  children: (props: UseFormReturn<yup.InferType<typeof schema>>) => ReactNode;
};

export const UserNameForm = ({ children }: UserNameFormProps) => {
  const providerProps = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  return (
    <FormProvider {...providerProps}>
      <StyledForm onSubmit={(e) => e.preventDefault()}>
        {/* 
          The render props pattern used here allows for greater flexibility 
          and reuse by treating the child function as a first-class citizen  
         */}
        {children(providerProps)}
      </StyledForm>
    </FormProvider>
  );
};

const StyledForm = styled("form")({
  width: "100%",
});
