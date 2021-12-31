<template>
    <div class="container">
        <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="音频输入设备：">
                <el-select v-model="formInline.audioSource" placeholder="音频输入设备">
                    <el-option :label="item.text" :value="item.value" v-for="(item, key) in audioSource" :key='key'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="音频输出设备：">
                <el-select v-model="formInline.audioOutput" placeholder="音频输出设备">
                    <el-option :label="item.text" :value="item.value" v-for="(item, key) in audioOutput" :key='key'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="视频输入设备：">
                <el-select v-model="formInline.videoSource" placeholder="视频输入设备">
                    <el-option :label="item.text" :value="item.value" v-for="(item, key) in videoSource" :key='key'></el-option>
                </el-select>
            </el-form-item>
        </el-form> -->

        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="_id" label="日期" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="url" label="地址"></el-table-column>
          </el-table>



        <!--        <el-button type="primary" plain>逻辑服务</el-button>-->

    </div>
</template>

<script>
    export default {
        name: 'dashboard',
        data() {
            return {
                formInline: {
                    audioSource: '',
                    audioOutput: '',
                    videoSource: ''
                },
                tableData: []
            }
        },
        methods: {

        },
        mounted() {
            this.$axios.get('http://192.168.131.111:3000/goods')
            .then((response) => {
              // success
                console.log(response.data);
                this.tableData = response.data.list;
            })
            .catch((error) => {
                // error
                console.log(error)
            })
            let data = {
                _id: '1',
                name: '张三',
                url: 'http://192.168.131.111:3000/goods/add'
            }
            this.$axios.post('http://192.168.131.111:3000/goods/add', data)
            .then((response) => {
              // success
                console.log(response.data);
            })
            .catch((error) => {
                // error
                console.log(error)
            })
        }
    }
</script>


<style scoped>
    .container {
        height: 100%;
    }

    #app {
        /*display: inline-block;*/
        position: relative;
        /*定位*/
        width: 200px;
        height: 200px;
        background: #666;
        /*设置一下背景*/
        left: 0;
        top: 0;
    }
</style>
