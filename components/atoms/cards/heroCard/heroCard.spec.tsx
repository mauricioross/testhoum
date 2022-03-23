import { render,screen, waitFor } from '@testing-library/react';
import { HeroCard } from './heroCard';

describe('should be render',()=>{
    it('HeroCard',()=>{
        const data = {
            name:'pikachu'
        }
        const {baseElement} = render(<HeroCard key={0}/>)
        expect(baseElement).toBeTruthy();
    })
})