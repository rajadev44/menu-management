import { Footer2 } from "@/components/sections/footer"
import Header from "@/components/sections/header"
import UserLayout from "@/components/sections/user-layout"
import UserCategorySection from '@/components/sections/user-category-section'
export const MainCategory = () => {
  return (
    <UserLayout>
        <Header></Header>
        <UserCategorySection></UserCategorySection>
        <Footer2></Footer2>
    </UserLayout>
  )
}
