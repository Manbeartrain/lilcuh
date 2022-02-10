import { makeStyles } from "@mui/styles"
import axios from "axios"
import { useEffect, useState } from "react";
import ToText from "./utils/toText";
import useMediaQuery from '@mui/material/useMediaQuery';


import BG from '../src/assets/background.jpg'
import lilcuh from '../src/assets/lilcuh.png'
import discordIcon from '../src/assets/discordIcon.png'
import mediumIcon from '../src/assets/mediumIcon.png'
import temp from '../src/assets/temp.png'

import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useMoralisWeb3Api, useMoralis } from "react-moralis";
import { NFTs } from "./components/NFTs";


let mediumURL = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@kunalchaubal";

function App() {
  const classes = useStyles()

  const mobile = useMediaQuery('(max-width:600px)');
  const tablet = useMediaQuery('(max-width:1000px)')
  const heightCap = useMediaQuery('(max-height:900px)')

  const [feed, setFeed] = useState()
  const [profile, setProfile] = useState()
  const [nfts, setNFTs] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const { Moralis } = useMoralis()
  const Web3Api = useMoralisWeb3Api()

  const fetchNFTs = async () => {
    const options = { chain: 'eth', address: '0x88eFB8722c36B28De3F842ED7B80f6a494785d2c' };
    const results = await Web3Api.account.getNFTs(options)

    return results
  }

  const serverUrl = process.env.REACT_APP_MORALIS_SERVER;
  const appId = process.env.REACT_APP_MORALIS_APP_ID;

  useEffect(() => {
    setIsLoading(true)
    Moralis.start({ serverUrl, appId })
    fetchNFTs().then((res) => setNFTs(res)).then(() => setIsLoading(false))

    // MEDIUM CALL

    // axios.get(mediumURL).then((res) => {
    //   setFeed(res.data.items)
    //   setProfile(res.data.feed)
    // })

  }, []);
  return (
    <div className={classes.appContainer}>
      <div className={classes.headerContainer} style={{ backgroundImage: `url(${BG})`, backgroundSize: 'cover' }}>
        <div className={classes.heroContainer} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className={mobile ? classes.mobileIconContainer : (tablet ? classes.tabletIconContainer : classes.iconContainer)} style={{display: heightCap ? 'none' : null}} >
            <img src={lilcuh} style={{ width: mobile ? '80%' : (tablet ? '70%' : '80%'), height: 'auto', marginLeft: mobile ? 30 : 70, cursor: 'pointer',}} onClick={() => window.open('https://opensea.io/collection/deadfellaz')} />
          </div>
          <div className={mobile ? classes.mobileInfoContainer : (tablet ? classes.tabletInfoContainer : classes.headerInfoContainer)}>
            <h2 className={mobile ? classes.mobileTitle : (tablet ? classes.tabletTitle : classes.headerTitle)}>NO QUEMA CUH!!</h2>
            <p className={mobile ? classes.mobileSubText : (tablet ? classes.tabletHeaderSubText : classes.headerSubtext)}>
              Join the LatinX inspired crypto community behind Dead Fellaz #1451. Follow our Twitter for the latest
              in crypto news or join our discord and come speak with our community. Zero miedo mi compa.
              Everyone welcomed, cause everyone's a cuh.
            </p>
            <div className={classes.socialContainer}>
              <div className={mobile ? classes.mobileSocialIcon : (tablet ? classes.tabletSocialIcon : classes.socialIcon)} onClick={() => window.open('https://twitter.com/daboigbae')}>
                <TwitterIcon style={{ fontSize: 30, color: 'lightgreen' }} />
              </div>
              <div className={mobile ? classes.mobileSocialIcon : (tablet ? classes.tabletSocialIcon : classes.socialIcon)} onClick={() => window.open('https://discord.gg/vTUr4Pwj')}>
                <img src={discordIcon} style={{ width: '70%', }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <NFTs nfts={nfts.result} isLoading={isLoading} />

      {/* BLOG CONTAINER */}

      {/* <div className={classes.blogContainer}>
        {console.log(profile)}
        <div className={classes.profileThumbnail} style={{backgroundImage: `url(https://media.discordapp.net/attachments/717579666264817745/939612403614761000/IMG_4817.png)`, backgroundSize: 'cover'}}>
 
        </div>
        <p style={{ fontSize: 25, fontWeight: '700', color: '#02072b' }}>Stories by El Mero Mero</p>
        <p style={{fontSize: 16, color: 'silver', marginTop: 8, }}>lil cuh</p>
        <div className={classes.mediumButton}>
          Read on Medium
        </div>
        <div className={classes.scrollContainer}>
          {feed && feed.map((item, index) => {
            return (
              <>
                <div className={classes.blogItem} key={index} onClick={() => window.open(`${item.link}`, '_blank')} >
                  <div className={classes.imageContainer} style={{ backgroundImage: `url(${item.thumbnail})`, backgroundSize: 'cover' }}></div>
                  <h2 className={classes.blogTitle}>{item.title}</h2>
                  <p className={classes.blogDescription}>{`${ToText(item.description).substring(0, 150)}...`}</p>
                  <div className={classes.blogInfo}>
                    <p className={classes.blogDescription}>Author: {item.author}</p>
                    <p className={classes.blogDescription}>Date: {item.pubDate}</p>
                  </div>
                </div>
              </>
            )
          })}
        </div>
      </div> */}
    </div>
  );
}

export default App;

const useStyles = makeStyles({
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  headerContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: '4em',
    fontWeight: '800',
    color: 'lightgreen',
  },
  mobileTitle: {
    textAlign: 'center',
    fontSize: 55,
    fontWeight: '800',
    color: 'lightgreen'
  },
  tabletTitle: {
    textAlign: 'center',
    fontSize: 80,
    fontWeight: '800',
    color: 'lightgreen'
  },
  headerSubtext: {
    fontSize: 20,
    width: '100%',
    opacity: .6,
    textAlign: 'center',
    color: 'lightgreen'
  },
  mobileSubText: {
    fontSize: 20,
    width: '85%',
    opacity: .8,
    textAlign: 'center',
    color: 'lightgreen'
  },
  tabletHeaderSubText: {
    fontSize: 24,
    width: '85%',
    opacity: .8,
    textAlign: 'center',
    color: 'lightgreen'
  },
  socialContainer: {
    marginTop: 30,
    display: 'flex',
    justifyContent: 'center',
    width: '80%',
  },
  nftContainer: {
    textAlign: 'center',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 30,
    display: 'flex',
    justifyContent: 'flex-start',
    width: '25%',
    bottom: '30%',
    right: 100,
  },
  collection: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  nft: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 130,
    width: '30%',
    background: '#350f76',
    borderRadius: 8,
  },
  socialIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    height: 45,
    width: 45,
    background: '#6a0e89',
    border: '3px solid #6a0e89',
    borderRadius: 100,
    cursor: 'pointer',
  },
  mobileSocialIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    height: 50,
    width: 50,
    background: '#6a0e89',
    border: '3px solid #6a0e89',
    borderRadius: 100,
  },
  tabletSocialIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    height: 85,
    width: 85,
    background: '#6a0e89',
    border: '3px solid #6a0e89',
    borderRadius: 100,
  },
  imageContainer: {
    height: 225,
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  profileThumbnail: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    height: 120,
    width: 120,
    borderRadius: 100,
    marginBottom: 25
  },
  mediumButton: {
    marginTop: 25,
    marginBottom: 30,
    padding: '9px 30px',
    height: 20,
    borderRadius: 8,
    border: '1px solid #02072b',
    background: 'white',
    color: '#02072b',
    transition: 'all ease-in-out .3s',
    cursor: 'pointer',
    '&:hover': {
      color: 'white',
      background: "#02072b",

    }
  },
  heroContainer: {
    display: 'flex',
    flexDirection: 'column-reverse',
    height: '100%',
    width: '100%',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: '50%',
    width: '40%',
  },
  mobileIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: '40%',
    width: '100%',
  },
  tabletIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: '50%',
    width: '100%',
  },
  headerInfoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '50%',
    width: '40%',
  },
  mobileInfoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '60%',
    width: '100%',
  },
  tabletInfoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '50%',
    width: '100%',
  },
  blogContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    flexFlow: 'row wrap',
    background: 'white'

  },
  blogItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 20,
    maxHeight: 500,
    minHeight: 500,
    marginBottom: 50,
    width: '31%',
    borderRadius: 8,
    background: '#02072b',
    boxShadow: '0 0px 18px hsl(0deg 0% 0% / 0.3);',
    cursor: 'pointer',
  },
  scrollContainer: {
    display: 'flex',
    padding: '0px 20px',
    justifyContent: 'space-between',
    overflowY: 'scroll',
    flexWrap: 'wrap',
    maxHeight: 550,
    width: '80%',
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  blogTitle: {
    fontSize: 20,
    color: 'white',
    marginLeft: 25,
    marginTop: 20,
    width: '85%',
  },
  blogDescription: {
    fontSize: 16,
    color: 'silver',
    marginLeft: 25,
    marginTop: 8,
    width: '75%',
  },
  blogInfo: {
    flex: 1,
    width: '100%',
    display: 'flex',
    paddingBottom: 30,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  }
})
