import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { HeroCard } from '../../components/atoms/cards/heroCard/heroCard';
import { messages } from '../../utils/enums';
import styles from './landingPage.module.scss'
import Oak from '../../assets/profesoroak.png';
export default function LandingPage(props: any) {
    const [Items, setItems] = useState([]);
    const [NextPage, setNextPage] = useState(null)
    const [PokemonSelected, setPokemonSelected] = useState(null)
    const [open, setOpen] = useState(false);
    const [NameFilter, setNameFilter] = useState('');
    const [FilterData, setFilterData] = useState([])
    const [Message, setMessage] = useState('');
    const handleOpen = (data: any) => {
        setPokemonSelected(data);
        let numb = Math.floor(Math.random() * (4 - 0)) + 0;
        setMessage(messages[numb]);
        setOpen(true);
     
    };
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    useEffect(() => {
        fetchItems();
    }, [])

    useEffect(() => {
        (async () => {
            if (NameFilter.trim() === '') {
                await setItems([].concat([]));
                await fetchItems();
            }
        })
    }, [NameFilter])
    const getPokemon = async () => {
        try {
            let url = 'https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0';
            const pokemons = await fetch(`${url}`);
            const dataPkmns: any = await pokemons.json();
            if (dataPkmns) {
                setItems(Items.concat(dataPkmns.results));
                setNextPage(dataPkmns.next)
            }
        }
        catch (error) {
            console.error('fetchItems =>', error);
        }
    }
    const fetchItems = async () => {
        setFilterData([]);
        try {
            let url = '';
            if (NextPage !== null && NameFilter === '') {
                url = NextPage;
            } else {
                url = 'https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0'
            }
            const pokemons = await fetch(`${url}`);
            const dataPkmns: any = await pokemons.json();
            if (dataPkmns) {
                setItems(Items.concat(dataPkmns.results));
                setNextPage(dataPkmns.next)
            }
        }
        catch (error) {
            console.error('fetchItems =>', error);
        }
    }
    const handleChangeNameFilter = async (e: any) => {
        setNameFilter(e.target.value.toLowerCase())
        if (NameFilter.trim() === '') {
        
            await fetchItems();
        }
    }
    const handleSetFilter = async () => {
        if (NameFilter.trim().length <= 0) {
            fetchItems();
            return;
        }
        const url = `https://pokeapi.co/api/v2/pokemon/${NameFilter}`;
        const pokemonSearch = await fetch(`${url}`);
        if (pokemonSearch.status === 200) {
            const data: any = await pokemonSearch.json();
            let newArray: any = [];
            newArray.push(data);
            setNextPage(null);
            setFilterData(newArray)
        } else {
            console.log('no encontrado');
        }
    }


    return (
        <div className={`${styles.landingPage}`}>
            <section className={`${styles.landingPage_title}`}>
                <h1>
                    Ya encontraste tu nuevo hogar
                    <p>Ahora necesitas un pokemon!</p>
                </h1>

            </section>
            <section className={`${styles.landingPage_filters}`}>
                <div className={`${styles.landingPage_filters_input}`}>
                    <TextField
                        id="outlined-basic"
                        label="Nombre o  id"
                        placeholder='Pikachu, Charizard, etc'
                        variant="outlined"
                        onChange={(e) => handleChangeNameFilter(e)}
                        fullWidth />
                </div>
                <Button
                    variant='outlined'
                    color='primary'
                    onClick={handleSetFilter}
                    style={{ borderColor: '#ff5000', color: '#ff5000' }}
                >Buscar</Button>
            </section>
            <section className={`${styles.landingPage_body}`}>
                <div className={`${styles.landingPage_body__list}`}>
                    {NameFilter !== '' ? (
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}>
                        {FilterData.map((item: any, idx: any) => {
                            return (<Grid item xs={12} sm={12} md={4} key={idx}>
                                <HeroCard key={idx} pokemon={item} action={(data: any) => handleOpen(data)}></HeroCard>
                            </Grid>
                            )
                        })}
                        </Grid>
                    ) : null}
                    {FilterData.length <= 0 || NameFilter === '' ? <InfiniteScroll
                        dataLength={Items.length}
                        next={fetchItems}
                        hasMore={true}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>Ya no tenemos más opciones</b>
                            </p>
                        }
                        refreshFunction={getPokemon}
                        pullDownToRefresh
                        pullDownToRefreshThreshold={150}
                        pullDownToRefreshContent={
                            <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                        }
                        releaseToRefreshContent={
                            <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                        }>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}>

                            {Items.map((item: any, idx: any) => {

                                return (<Grid item xs={12} sm={12} md={4} key={idx}>
                                    <HeroCard key={idx} pokemon={item} action={(data: any) => handleOpen(data)}></HeroCard>
                                </Grid>
                                )
                            })}
                        </Grid>

                    </InfiniteScroll> : null}
                    {/* {
                        FilterData.length <= 0 || Items.length <= 0 ?
                            (<h2>No hemos encontrado lo que buscas, quizás intenta con otro nombre.</h2>) : null
                    } */}

                </div>
            </section>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {PokemonSelected && PokemonSelected.name}{Message}
                    </Typography>
                    <Image src={Oak} width={300} height={500}></Image>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                       
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}