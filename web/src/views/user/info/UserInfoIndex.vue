<template>
  <div class="container">
      <div class="row">
          <div class="col-3">
              <div class="card" style="margin-top: 20px;">
                  <div class="card-body">
                      <div class="photo-container">
                        <img :src="$store.state.user.photo" alt="" style="width: 100%;">
                      </div>
                      <hr>
                      <div align="center">
                        <form id="form_submit_photo" class="form-horizontal" role="form" action="/user/profile/saverawphoto" method="post" enctype="multipart/form-data">
                          <input type="hidden" name="">
                          <label class="btn btn-default btn-file">
                            更新头像
                            <input id="ingredient_file" type="file" accept="image/*" style="display: none;" name="photo" required>
                          </label>
                        </form>
                      </div>
                  </div>
              </div>
          </div>
          <div class="col-9" style="margin-top: 20px;">
            <div class="panel panel-default">
              <div class="panel-body">
                <div class="row" style="margin-left: 20px; margin-right: 20px;">
                  <h3>个人信息</h3>
                  <hr>
                  <form id="form_upload_profileinfo" class="form-hotizontal" role="form" action="/user/profile/index/" method="post" enctype="multipart/form-data">
                    <input type="hidden">
                    <div class="form-group">
                      <label class="control-label">
                        <label for="id_username">用户名：</label>
                      </label>
                      <div class="col-md">
                        <input type="text" name="username" value="长何落日" class="form-control" maxlength="30" required id="id-username">
                      </div>
                      <span class="text-danger small"></span>
                    </div>
                    <div class="form-group">
                      <label class="control-label">
                        <label for="id_email">邮件地址：</label>
                      </label>
                      <div class="col-md">
                        <input type="email" name="email" value="249730152@qq.com" class="form-control" style="margin-top: 0;" maxlength="50" required id="id-id-email">
                      </div>
                      <span class="text-danger small"></span>
                    </div>
                    <div class="form-group">
                      <label class="control-label">
                        <label for="id_resume">个人简介：</label>
                      </label>
                      <div class="col-md">
                        <textarea name="resume" cols="40" rows="4" class="form-control" maxlength="500" required id="id-id-resume">orz</textarea>
                      </div>
                      <span class="text-danger small"></span>
                    </div>
                    <div class="col-xs-offset-5">
                      <button type="submit" class="btn btn-success" style="border-radius: 5px;">更新信息</button>
                    </div>


                  </form>
                </div>
              </div>
            </div>
              <!-- <div class="card" style="margin-top: 20px;">
                  <div class="card-header">
                      <span style="font-size: 150%;">个人信息</span>
                  </div>
                  <div class="card-body">
                      <table class="table table-striped table-hover">
                          <thead>
                              <tr>
                                  <th>名称</th>
                                  <th>创建时间</th>
                                  <th>操作</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr v-for="bot in bots" :key="bot.id">
                                  <td>{{ bot.title }}</td>
                                  <td>{{ bot.createtime }}</td>
                                  <td>
                                      <button type="button" class="btn btn-secondary" style="margin-right: 10px;"  data-bs-toggle="modal" :data-bs-target="'#update-bot-modal-' + bot.id">修改</button>
                                      <button type="button" class="btn btn-danger" @click="remove_bot(bot)">删除</button>

                                      <div class="modal fade" :id="'update-bot-modal-' + bot.id" tabindex="-1">
                                          <div class="modal-dialog modal-xl">
                                              <div class="modal-content">
                                              <div class="modal-header">
                                                  <h1 class="modal-title fs-5">修改Bot</h1>
                                                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                              </div>
                                              <div class="modal-body">
                                                  <div class="mb-3">
                                                      <label for="add-bot-title" class="form-label">名称</label>
                                                      <input v-model="bot.title" type="text" class="form-control" id="add-bot-title" placeholder="请输入Bot名称">
                                                  </div>
                                                  <div class="mb-3">
                                                      <label for="add-bot-description" class="form-label">简介</label>
                                                      <textarea v-model="bot.description" class="form-control" id="add-bot-description" rows="3" placeholder="请输入Bot简介"></textarea>
                                                  </div>
                                                  <div class="mb-3">
                                                      <label for="add-bot-code" class="form-label">代码</label>
                                                      <VAceEditor
                                                          v-model:value="bot.content"
                                                          @init="editorInit"
                                                          lang="c_cpp"
                                                          theme="textmate"
                                                          style="height: 300px" />
                                                  </div>
                                              </div>
                                              <div class="modal-footer">
                                                  <div class="error-message">{{ bot.error_message }}</div>
                                                  <button type="button" class="btn btn-primary" @click="update_bot(bot)">保存修改</button>
                                                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                                              </div>
                                              </div>
                                          </div>
                                      </div>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div> -->
          </div>
      </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import $ from 'jquery'
import { useStore } from 'vuex';
import { Modal } from 'bootstrap/dist/js/bootstrap';
// import { VAceEditor } from 'vue3-ace-editor';
import ace from 'ace-builds';

export default {
  components: {
    //   VAceEditor
  },
  setup() {
      ace.config.set(
          "basePath", 
          "https://cdn.jsdelivr.net/npm/ace-builds@" + require('ace-builds').version + "/src-noconflict/")
      
      const store = useStore();
      let bots = ref([]);

      const botadd = reactive({
          title: "",
          description: "",
          content: "",
          error_message: "",
      });

      const refresh_bots = () => {
          $.ajax({
              url: "http://localhost:3000/user/bot/getlist/",
              type: "get",
              headers: {
                  Authorization: "Bearer " + store.state.user.token,
              },
              success(resp) {
                  bots.value = resp;
              }
          })
      }

      refresh_bots();

      const add_bot = () => {
          botadd.error_message = "";
          $.ajax({
              url: "http://localhost:3000/user/bot/add/",
              type: "post",
              data: {
                  title: botadd.title,
                  description: botadd.description,
                  content: botadd.content,
              },
              headers: {
                  Authorization: "Bearer " + store.state.user.token,
              },
              success(resp) {
                  if (resp.error_message === "success") {
                      botadd.title = "";
                      botadd.description = "";
                      botadd.content = "";
                      Modal.getInstance("#add-bot-btn").hide();
                      refresh_bots();
                  } else {
                      botadd.error_message = resp.error_message;
                  }
              }
          })
      }

      const update_bot = (bot) => {
          botadd.error_message = "";
          $.ajax({
              url: "http://localhost:3000/user/bot/update/",
              type: "post",
              data: {
                  bot_id: bot.id,
                  title: bot.title,
                  description: bot.description,
                  content: bot.content,
              },
              headers: {
                  Authorization: "Bearer " + store.state.user.token,
              },
              success(resp) {
                  if (resp.error_message === "success") {
                      Modal.getInstance('#update-bot-modal-' + bot.id).hide();
                      refresh_bots();
                  } else {
                      botadd.error_message = resp.error_message;
                  }
              }
          })
      }

      const remove_bot = (bot) => {
          $.ajax({
              url: "http://localhost:3000/user/bot/remove/",
              type: "post",
              data: {
                  bot_id: bot.id,
              },
              headers: {
                  Authorization: "Bearer " + store.state.user.token,
              },
              success(resp) {
                  if (resp.error_message === "success") {
                      refresh_bots();
                  }
              }
          })
      }

      return {
          bots,
          botadd,
          add_bot,
          update_bot,
          remove_bot,
      }
  }
}
</script>

<style scoped>
div.error-message {
  color: red;
}
.container {
    width: 80%;
}
hr {
  margin-top: 20px;
  margin-bottom: 20px;
  height: 1px;
  color: #ccc;
}
.btn {
  font-weight: 400;
}
.btn-file {
  position: relative;
  overflow: hidden;
  border-radius: 5px;
}
.btn-default {
  color: #333;
  background-color: #fff;
  border-color: #ccc;
}

.panel {
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
}
.panel-default {
  border-color: #ddd;
}
.panel-body {
  padding: 15px;
}
h3 {
  font-size: 24px;
  padding: 0;
  margin-top: 20px;
  margin-bottom: 0;
  line-height: 1.1;
}
hr {
  padding: 0;
}

.form-horizontal .form-group {
  margin-right: -15px;
  margin-left: -15px;
}
.form-group {
  margin-bottom: 15px;
}

label {
  display: inline-block;
  max-width: 100%;
  font-weight: 700;
}

.form-control {
  border-radius: 0;
  display: block;
  width: 100%;
  /* height: 34px; */
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.43;
  color: #555;
  background-color: #fff;
  border: 1px solid #ccc;
}

.col-xs-offset-5 {
  margin-left: 41.67%;
}

/* @media (min-width: 992px){ 
.col-md-3 {
  width: 25%;
  float: left;
}
}
@media (min-width: 768px){
  .form-horizontal .control-label {
    padding-top: 7px;
    margin-bottom: 0;
    text-align: right;
  }
} */
</style>