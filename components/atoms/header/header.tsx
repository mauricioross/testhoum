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
            {props.logo ? <Image src={props.logo || Logo} width={100} height={50} alt="logo"></Image>:null} + Pokemón
        </div>
    )
}