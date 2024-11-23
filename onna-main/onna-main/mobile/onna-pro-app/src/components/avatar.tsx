import { Image, ImageProps } from "react-native"

import clsx from "clsx"

type AvatarProps = ImageProps & {
    size?: "small" | "medium" | "large"
}

export function Avatar({ size = "medium", ...rest }: AvatarProps) {
    return (
        <Image
            className={clsx("rounded-full", {
                "w-12 h-12": size === "small",
                "w-14 h-14": size === "medium",
                "w-[182.5px] h-[182.5px] mt-[50px]": size === "large"
            })}
            style={{ resizeMode: 'contain' }} 
            {...rest}
        />
    )
}
