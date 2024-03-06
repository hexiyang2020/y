import { createRouter, createWebHistory } from 'vue-router'
// import PkIndexView from '../views/pk/PkIndexView'
// import RecordIndexView from '../views/record/RecordIndexView'
// import RanklistIndexView from '../views/ranklist/RanklistIndexView'
import UserBotIndexView from '../views/user/bot/UserBotIndexView'
import NotFoundView from '../views/error/NotFoundView'
import UserAccountLoginView from '../views/user/account/UserAccountLoginView'
import UserAccountRegisterView from '../views/user/account/UserAccountRegisterView'

import FrontPageIndex from '../views/frontpage/FrontPageIndex'
import ReservationIndex from '../views/reservation/ReservationIndex'
import OrderListIndex from '../views/orderlist/OrderListIndex'
import UserSpaceIndex from '../views/user/space/UserSpaceIndex'
import UserInfoIndex from '../views/user/info/UserInfoIndex'
import UserOrderIndex from '../views/user/order/UserOrderIndex'
import store from '../store/index'

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/index/",
    meta: {
      requestAuth: true,
    }
  },
  {
    path: "/index/",
    name: "frontpage_index",
    component: FrontPageIndex,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: "/reservation/",
    name: "reservation_index",
    component: ReservationIndex,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: "/orderlist/",
    name: "orderlist_index",
    component: OrderListIndex,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: "/user/myspace/",
    name: "user_space_index",
    component: UserSpaceIndex,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: "/user/info/",
    name: "user_info_index",
    component: UserInfoIndex,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: "/user/order/",
    name: "user_order_index",
    component: UserOrderIndex,
    meta: {
      requestAuth: true,
    }
  },
  // {
  //   path: "/",
  //   name: "home",
  //   redirect: "/pk/",
  //   meta: {
  //     requestAuth: true,
  //   }
  // },
  // {
  //   path: "/pk/",
  //   name: "pk_index",
  //   component: PkIndexView,
  //   meta: {
  //     requestAuth: true,
  //   }
  // },
  // {
  //   path: "/record/",
  //   name: "record_index",
  //   component: RecordIndexView,
  //   meta: {
  //     requestAuth: true,
  //   }
  // },
  // {
  //   path: "/ranklist/",
  //   name: "ranklist_index",
  //   component: RanklistIndexView,
  //   meta: {
  //     requestAuth: true,
  //   }
  // },
  {
    path: "/user/bot/",
    name: "user_bot_index",
    component: UserBotIndexView,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: "/user/account/login/",
    name: "user_account_login",
    component: UserAccountLoginView,
    meta: {
      requestAuth: false,
    }
  },
  {
    path: "/user/account/register",
    name: "user_account_register",
    component: UserAccountRegisterView,
    meta: {
      requestAuth: false,
    }
  },
  {
    path: "/404/",
    name: "404",
    component: NotFoundView,
    meta: {
      requestAuth: false,
    }
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404/",
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requestAuth && !store.state.user.is_login) {
    next({name: "user_account_login"});
  } else {
    next();
  }
})

export default router
