import Breadcrumbs from "@/components/common/Breadcrumbs"
import FooterThree from "@/layouts/footers/FooterThree"
import HeaderSix from "@/layouts/headers/HeaderSix"
import ContactArea from "./ContactArea"
import FooterNews from "@/components/common/FooterNews"
import ContactMap from "./ContactMap"


const Contact = () => {
   return (
      <>
         <HeaderSix />
         <main className="fix">
            <Breadcrumbs page="Contact With Us" style={false} />
            <ContactArea />
            <ContactMap />
           {/*  <FooterNews /> */}
         </main>
         <FooterThree  />
      </>
   )
}

export default Contact
