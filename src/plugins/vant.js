// 按需全局引入 vant组件
import Vue from 'vue'
import { Button, Sku, NavBar, PasswordInput, NumberKeyboard, SwipeCell, Stepper, List, Col, CellGroup, Row, Dialog, Cell, Tabbar, SubmitBar, Uploader, Notify, TabbarItem, Icon, Swipe, Checkbox, SwipeItem, Tab, Tabs, Toast, Tag, Sticky, PullRefresh, Sidebar, SidebarItem, Card } from 'vant'
Vue.use(Button).use(Cell).use(List).use(Tabbar).use(TabbarItem).use(Icon).use(Swipe).use(SwipeItem).use(Tab).use(Tabs).use(Tag).use(Sticky).use(PullRefresh);
Vue.use(Sidebar).use(SidebarItem).use(Col).use(Row).use(NavBar).use(Dialog).use(Checkbox).use(Toast).use(Uploader).use(CellGroup).use(Notify).use(Sku);
Vue.use(Card).use(Stepper).use(SwipeCell).use(SubmitBar).use(PasswordInput).use(NumberKeyboard);