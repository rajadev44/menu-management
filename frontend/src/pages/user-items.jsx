import {Footer2} from "@/components/sections/footer"
import Header from "@/components/sections/header"
import UserItemsSections from "@/components/sections/user-items-section"
import UserLayout from "@/components/sections/user-layout"
export const MainItems = () => {
  return (
    <UserLayout>
        <Header></Header>
        <UserItemsSections></UserItemsSections>
        <Footer2></Footer2>
    </UserLayout>
  )
}
