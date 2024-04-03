import FormTasks from "./components/FormTasks";
import ListTasks from "./components/ListTasks";
export const dynamic = "force-dynamic"
function Homepage(){
  return (
    <div className="container mx-auto">
      <h1>Tasks App</h1>
      <div className="flex gap-x-10">
        <FormTasks />
        <ListTasks />
      </div>
      
    </div>
  )
}
export default Homepage;