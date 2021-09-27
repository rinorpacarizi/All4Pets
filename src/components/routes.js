import PetTab from './Pet/PetTab.vue';
import ActivityTab from './Avtivity/ActivityTab.vue';
import MedicalTab from './Medical/MedicalTab.vue';

export default[
    {
        path:'/',
        component:PetTab
    },
    {
        path:'/activity',
        component:ActivityTab
    },
    {
        path:'/medical',
        component:MedicalTab
    }
]

