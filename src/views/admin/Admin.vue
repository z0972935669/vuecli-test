<template>
    <div>
        <Navbar/>
        <div>
            <div class="row m-0">
                <Sidebar></Sidebar>
                <main class="col-12">
                    <router-view></router-view>
                </main>
            </div>
        </div>
    </div>
</template>
<script>
import Sidebar from '@/components/admin/Sidebar'
import Navbar from '@/components/admin/Navbar'
export default {
  components: {
    Sidebar,
    Navbar
  }
}
</script>
