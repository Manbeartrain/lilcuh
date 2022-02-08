import React from 'react';
import { makeStyles } from '@mui/styles'

export const NFTs = ({ nfts }) => {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <h2 className={classes.title}>Our NFT Collection</h2>
            <p className={classes.subText}>(Si Quema Cuh)</p>
            <div className={classes.flexContainer}>
                <div className={classes.nftContainer}>
                
                    {nfts && nfts.map((nft, index) => {
                        const metadata = nft && JSON.parse(nft.metadata)
                        if (nft.is_valid === 0 || nft.name === 'DeadFrenz Pass') {
                            return null
                        } else {
                            return (
                                <div className={classes.nft} key={index} onClick={() => window.open(`https://opensea.io/assets/${nft && nft.token_address}/${nft && nft.token_id}`)}>
                                    <div className={classes.nftImage} style={{ backgroundImage: `url(${metadata && metadata.image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}></div>
                                    <div className={classes.nftInfo}>
                                        <h2 className={classes.nftTitle}>{metadata && metadata.title || metadata && metadata.name}</h2>
                                        <div className={classes.traits}>
                                            {metadata && metadata.attributes.map((trait, index) => {
                                                return (
                                                    trait && trait.value === 'No'
                                                        ? null
                                                        :
                                                        <div key={index} className={classes.trait}>
                                                            <p>{trait.value}</p>
                                                        </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )
};

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        background: '#04061e'
    },
    flexContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '85%',
        width: '95%',
    },
    nftContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        height: '100%',
        width: '100%',
    },
    title: {
        fontSize: 50,
        textTransform: 'uppercase',
        marginTop: 50,
        color: '#ec407a',
    },
    subText: {
        fontWeight: '600',
        letterSpacing: 4,
        textTransform: 'uppercase',
        color: 'lightgreen',
        marginTop: 40,
        marginBottom: 50,
    },
    nft: {
        display: 'flex',
        flexDirection: 'column',
        height: 600,
        width: '25%',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 50,
        borderRadius: 8,
        background: 'red',
        border: '8px solid #ec407a ',
        cursor: 'pointer',
    },
    nftImage: {
        height: '60%',
        width: '100%',
    },
    nftInfo: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        background: '#04061e',
    },
    nftTitle: {
        display: 'flex',
        alignItems: 'center',
        fontSize: 28,
        color: 'silver',
        width: '70%',
        marginLeft: 15,
        marginTop: 25,
        marginBottom: 15,
    },
    traits: {
        flex: 1,
        width: '95%',

        marginTop: 15,
        display: 'flex',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        marginLeft: 15,
    },
    trait: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 12,
        padding: '6px 12px',
        marginRight: 7,
        background: '#ec407a',
        borderRadius: 100,
        marginBottom: 8,
        color: 'white',
        fontWeight: '300',
        fontSize: 14,
    }
})
