import Image from 'next/image';
import styles from './header.module.scss';

export interface HeaderProps {
    logo?: any,
    children?: any,
    items?: any,

}

export const Header = (props: HeaderProps) => {
    
    return (
        <div className={`${styles.header_container}`}>
            <Image src={props.logo.src} width={props.logo.width} height={props.logo.height}></Image> + Pokemón
        </div>
    )
}