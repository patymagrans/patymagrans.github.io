import * as React from "react"
import ScrollArrow from "./scrollArrow"
import Header from "./header"

const Layout = ({ location, children, onlyMobile }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  React.useEffect(() => {
    window.speechSynthesis.cancel()
  }, []);

  return (
    <>
      <Header onlyMobile={onlyMobile} />
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <main>
          {children}
        </main>
        <ScrollArrow />
      </div>
      <footer>
        Ingeniería de Audio - Última actualización en {(new Date().getFullYear())}
      </footer>
    </>
  )
}

export default Layout
