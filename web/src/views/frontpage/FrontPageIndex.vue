<template>
  <ContentField>
      首页
  </ContentField>
  <div class="container posts">
    <el-card class="card posts-cards">
      <template #header>
        <div class="row">
            <div class="col-1 img-field">
                <img class="img-fluid" src="../../assets/images/userphoto.jpg" alt="">
            </div>
            <div class="col-11">
                <div class="username">hhh</div>
                <div class="follower-count">111</div>
            </div>
        </div>
      </template>
      <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p>
      <template #footer>Footer content</template>
    </el-card>
        <!-- <div class="card posts-cards">
          <div class="card-body">
                <div class="row">
                    <div class="col-1 img-field">
                        <img class="img-fluid" src="../../assets/images/userphoto.jpg" alt="">
                    </div>
                    <div class="col-11">
                        <div class="username">hhh</div>
                        <div class="follower-count">111</div>
                    </div>
                </div>
                <span class="posts-title">
                  过年求托管
                </span>
                <div class="posts-content">
                  救救孩子，过年要放假回家了，半个月不在，狗子没人照顾，求个好心人帮帮忙，有偿。
                </div>
            </div>
        </div> -->
  </div>
</template>

<script>
import ContentField from '../../components/ContentField.vue'

export default {
    components: {
        ContentField
    }
}
</script>

<style scoped>
.posts {
  width: 60%;
}

.posts-cards {
  padding: 10px;
}

.card {
  margin-top: 20px;
  cursor: pointer; /*鼠标变成 手 的形状 */
}

.card:hover {
    box-shadow: 2px 2px 10px lightgray;
    transition: 500ms;/*动画持续时间*/
}

.img-field {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 0;
    padding-right: 0;
}

.img-fluid {
  border-radius: 50%;
}

.posts-title {
  font-size: 18px;
  font-weight: 700;
}
</style>