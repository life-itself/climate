import { useEffect } from 'react'
import Script from 'next/script'
import { useRouter } from 'next/router'
import 'tailwindcss/tailwind.css'

import siteConfig from '../config/siteConfig.js'
import * as gtag from '../lib/gtag'


function MyApp({ Component, pageProps }) {
  // Google Analytics
  if (siteConfig.analytics) {
    const router = useRouter()
    useEffect(() => {
      const handleRouteChange = (url) => {
        gtag.pageview(url)
      }
      router.events.on('routeChangeComplete', handleRouteChange)
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange)
      }
    }, [router.events])
  }
  // end Google Analytics

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      {siteConfig.analytics &&
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics}`}
        />
        }
      {siteConfig.analytics &&
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${siteConfig.analytics}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        }
      <Script
        dangerouslySetInnerHTML={{
          __html: `
          (function(d,t) {
            var BASE_URL="https://app.chatwoot.com";
            var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src=BASE_URL+"/packs/js/sdk.js";
            g.defer = true;
            g.async = true;
            s.parentNode.insertBefore(g,s);
            g.onload=function(){
              window.chatwootSDK.run({
                websiteToken: 'tc1GJE9wAmNSHGVUUa8gDLcd',
                baseUrl: BASE_URL
              })
            }
          })(document,"script");
          `
        }}
        />
      <Component {...pageProps} />
  </>
  )
}

export default MyApp
