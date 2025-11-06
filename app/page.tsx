import React from 'react'
import CardNav from './component/dashBoard'

const page = () => {

const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company", href: "/company" },
        { label: "Careers", ariaLabel: "About Careers", href: "/careers" }
      ]
    },
    {
      label: "Projects", 
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Featured", ariaLabel: "Featured Projects", href: "/projects/featured" },
        { label: "Case Studies", ariaLabel: "Project Case Studies", href: "/projects/case-studies" }
      ]
    },
    {
      label: "Contact",
      bgColor: "#271E37", 
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us", href: "poemsbits@gmailcom" },
        { label: "Twitter", ariaLabel: "Twitter", href: "https://twitter.com/example" },
        { label: "LinkedIn", ariaLabel: "LinkedIn", href: "https://linkedin.com/company/example" }
      ]
    }
  ];
  return (
    <>
<main>
<CardNav
      logo="logo.png"
      logoAlt="Company Logo"
      items={items}
      baseColor="#fff"
      menuColor="#000"
      buttonBgColor="#111"
      buttonTextColor="#fff"
    />


</main>
    </>
     
  )
}

export default page
