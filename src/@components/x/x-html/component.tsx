import { Html } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { XHtmlProps } from './types'

export const XHtml = ({ style, children, ...props }: XHtmlProps) => {
  const { size } = useThree()

  return (
    <Html
      {...props}
      style={{
        position: 'relative',
        top: -size.height / 2,
        left: -size.width / 2,
        width: size.width,
        height: size.height,
      }}
    >
      <div style={style}>{children}</div>
    </Html>
  )
}
