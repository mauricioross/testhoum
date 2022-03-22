import Image from 'next/image';
import styles from './heroCard.module.scss';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { ButtonBase } from '@mui/material';
import { Stats } from '../../stats/stats';
import { types as type_pk } from '../../../../utils/enums';
export interface HeroCardProps {

    children?: any,
    pokemon?: any,
    key: Number,
    action:any


}

export const HeroCard = (props: HeroCardProps) => {
    const [Pokemon, setPokemon] = useState(null)
    useEffect(
        () => {
       
            ( async function fetchItems(){
                try {
                    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${props.pokemon.name}`);
                    const dataPkmn = await pokemon.json();
                    if( dataPkmn ){
                      setPokemon(dataPkmn);
                    }
                }
                catch(error){
                    console.error('fetchItems =>', error);
                }
            })();

        }, [])

    return (
        <div className={`${styles.heroCard_container}`}>
            {Pokemon ? <Card >
                <CardMedia
                    component="img"
                    height="140"
                    image={Pokemon && Pokemon['sprites']['front_default'] || 'https://thumbs.dreamstime.com/z/icono-de-plantilla-error-lugar-muerto-p%C3%A1gina-no-encontrada-problemas-con-el-sistema-eps-164583533.jpg'}
                    alt={Pokemon['name']}
                    className={`${styles.heroCard_container_card_media}`}
                >
                   
                    </CardMedia>
                <CardContent className={`${styles.heroCard_container_content}`}>
                    <Typography gutterBottom variant="h5" component="div" className={`${styles.heroCard_container_name}`}>
                            {Pokemon['name']}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" className={`${styles.heroCard_container_id}`}>
                           <div className={`${styles.heroCard_container_id_circle}`}>
                           {Pokemon['id']}
                           </div>
                    </Typography>
                    <Typography gutterBottom component="div" className={`${styles.heroCard_container_base_exp}`}>
                            Experiencia base: {Pokemon['base_experience']}
                    </Typography>
                    <Typography gutterBottom component="div" className={`${styles.heroCard_container_types}`} style={{backgroundColor:`${type_pk[Pokemon['types'][0]['type']['name']]}`,borderRadius:15,padding:'0.2rem 1rem' }}>
                            Tipo {Pokemon['types'][0]['type']['name']}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                       <strong>{Pokemon['name']}</strong> es de tipo { (Pokemon['types'] as Array<any>).map((t:any)=>t['type']['name']).join(', ')}. Sus habilidades son {(Pokemon['abilities'] as Array<any>).map((a:any)=>a['ability']['name']).join(' y ')}.
                    </Typography>
                </CardContent>
                <CardActions className={`${styles.heroCard_container_actions}`}>
                    <Stats data={Pokemon['stats']}></Stats>
                    <Button size="small" onClick={()=>props.action(Pokemon)} variant="outlined">Prof. Oak?</Button>
                </CardActions>
            </Card> : null}
        </div>
    )
}