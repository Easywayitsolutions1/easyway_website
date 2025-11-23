export const isCurrentDateTime = (reminderDateTime: string): boolean => {
    const currentDateTime = new Date();
    const reminderDate = new Date(reminderDateTime);
    return (
      currentDateTime.getFullYear() === reminderDate.getFullYear() &&
      currentDateTime.getMonth() === reminderDate.getMonth() &&
      currentDateTime.getDate() === reminderDate.getDate() &&
      currentDateTime.getHours() === reminderDate.getHours() &&
      currentDateTime.getMinutes() === reminderDate.getMinutes()
    );
  };

export const routeNameRegex = (name: string | undefined) =>{
    if(name){
      return name.replace(/\s+|\/+/g, "_").toLowerCase();

    }else{
        return
    }
}