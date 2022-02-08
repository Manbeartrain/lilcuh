import React from 'react';
import { makeStyles } from '@mui/styles'
import { useMediaQuery } from '@mui/material';



export const NFTs = ({ nfts }) => {
    const classes = useStyles()
    const mobile = useMediaQuery('(max-width:600px)');
    const tablet = useMediaQuery('(max-width:820px)');

    return (
        <div className={classes.container}>
            <h2 className={mobile ? classes.mobileTitle : classes.title}>Our NFT Collection</h2>
            <p className={classes.subText}>(Si Quema Cuh)</p>
            <div className={classes.flexContainer}>
                <div className={classes.nftContainer}>
                
                    {nfts && nfts.map((nft, index) => {
                        const metadata = nft && JSON.parse(nft.metadata)
                        if (nft.is_valid === 0 || nft.name === 'DeadFrenz Pass') {
                            return null
                        } else {
                            return (
                                <div className={mobile ? classes.mobileNft : ( tablet ? classes.tabletNft : classes.nft)} key={index} onClick={() => window.open(`https://opensea.io/assets/${nft && nft.token_address}/${nft && nft.token_id}`)}>
                                    <div className={classes.nftImage} style={{ backgroundImage: `url(${metadata && metadata.image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}></div>
                                    
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
    mobileTitle:{
        fontSize: 50,
        width: '80%',
        textAlign:'center',
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
        height: 400,
        width: '25%',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 50,
        borderRadius: 8,
        background: 'red',
        border: '8px solid #ec407a ',
        cursor: 'pointer',
    },
    mobileNft:{
        display: 'flex',
        flexDirection: 'column',
        height: 300,
        width: '100%',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 50,
        borderRadius: 8,
        background: 'red',
        border: '8px solid #ec407a ',
        cursor: 'pointer',
    },
    tabletNft:{
        display: 'flex',
        flexDirection: 'column',
        height: 550,
        width: '75%',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 50,
        borderRadius: 8,
        background: 'red',
        border: '8px solid #ec407a ',
        cursor: 'pointer',
    },
    nftImage: {
        height: '100%',
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
