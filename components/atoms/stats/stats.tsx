import { stats } from '../../../utils/enums';
import styles from './stats.module.scss';

export interface StatsProps {
    data?: any
}

export const Stats = (props: StatsProps) => {

    return (
        <div className={`${styles.stats_container}`}>
            {/* {props.data.map(
                (st)=>{
                    return (<p>{st.stat.name}</p>)
                }
            )} */}
            <span>
                <p>{stats[props.data[0].stat.name]} - {props.data[0].base_stat}</p>
                <p>{stats[props.data[1].stat.name]} - {props.data[1].base_stat}</p>
                <p>{stats[props.data[2].stat.name]} - {props.data[2].base_stat}</p>
            </span>
            <span>
                
                
            </span>
            <span>
            <p>{stats[props.data[3].stat.name]} - {props.data[3].base_stat}</p>
                <p>{stats[props.data[4].stat.name]} - {props.data[4].base_stat}</p>
                <p>{stats[props.data[5].stat.name]} - {props.data[5].base_stat}</p>
            </span>
        </div>
    )
}