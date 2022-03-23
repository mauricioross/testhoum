import { render,screen, waitFor } from '@testing-library/react';
import { Header } from './header';
import Logo from '../../../assets/houmLogo.svg';

describe('should be render',()=>{
    it('Header',()=>{
     
        const {baseElement} = render(<Header  />)
        expect(baseElement).toBeTruthy();
    })
})
