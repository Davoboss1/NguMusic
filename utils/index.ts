import { Colors } from "@/constants/Colors";
import Toast from "react-native-root-toast";
import { z } from "zod";

export const showToast = (msg: string, type: "success" | "error" | "info") => {
    
    let color = Colors.primary;
    if (type === "error") {
        color = Colors.error;
    } else if (type === "success") {
        color = Colors.success;
    }

    Toast.show(toTitleCase(msg), {
        position: Toast.positions.BOTTOM,
        duration: Toast.durations.LONG,
        backgroundColor: color,
        textColor: "white"
    });
}

export function toTitleCase(str: string) {
    return str.split('_').map(word => word[0]?.toUpperCase() + word?.slice(1))?.join(' ') || str;
  }

export const parseZodError = (zodData: z.SafeParseReturnType<any,any>) => {
    let data: { [key: string]: string } = {};
    if(!zodData.success){
        zodData.error.issues.forEach((error) => {
            data[error.path[0]] = error.message
        });
    }
    return data;
}

export function getFormData(object: { [key: string]: any }): FormData | null | undefined  {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
}