<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <!-- Widget: user widget style 1 -->
        <div class="card card-widget widget-user">
          <!-- Add the bg color to the header using any of the bg-* classes -->
          <div
            class="widget-user-header text-white"
            style="background: url('./img/photo1.png') center center;"
          >
            <h3 class="widget-user-username text-right">{{ form.name }}</h3>
            <h5 class="widget-user-desc text-right">Web Designer</h5>
          </div>
          <div class="widget-user-image">
            <img class="img-circle" :src="getProfilePhoto()" alt="User Avatar" />
          </div>
          <div class="card-footer">
            <div class="row">
              <div class="col-sm-4 border-right">
                <div class="description-block">
                  <h5 class="description-header">3,200</h5>
                  <span class="description-text">SALES</span>
                </div>
                <!-- /.description-block -->
              </div>
              <!-- /.col -->
              <div class="col-sm-4 border-right">
                <div class="description-block">
                  <h5 class="description-header">13,000</h5>
                  <span class="description-text">FOLLOWERS</span>
                </div>
                <!-- /.description-block -->
              </div>
              <!-- /.col -->
              <div class="col-sm-4">
                <div class="description-block">
                  <h5 class="description-header">35</h5>
                  <span class="description-text">PRODUCTS</span>
                </div>
                <!-- /.description-block -->
              </div>
              <!-- /.col -->
            </div>
            <!-- /.row -->
          </div>
        </div>
        <!-- /.widget-user -->
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header p-2">
            <ul class="nav nav-pills">
              <li class="nav-item">
                <a class="nav-link active" href="#activity" data-toggle="tab">Activity</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#settings" data-toggle="tab">Settings</a>
              </li>
            </ul>
          </div>
          <!-- /.card-header -->
          <div class="card-body">
            <div class="tab-content">
              <div class="active tab-pane" id="activity">
                <!-- Post -->
                <div class="post">Display Activity Here</div>
              </div>

              <div class="tab-pane" id="settings">
                <form class="form-horizontal">
                  <div class="form-group">
                    <label for="name" class="col-sm-2 col-form-label">Name</label>
                    <div class="col-sm-10">
                      <input
                        type="email"
                        class="form-control"
                        name="name"
                        id="name"
                        v-model="form.name"
                        placeholder="Name"
                        :class="{ 'is-invalid': form.errors.has('name') }"
                      />
                      <has-error :form="form" field="name"></has-error>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="email" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                      <input
                        type="email"
                        class="form-control"
                        name="email"
                        id="email"
                        v-model="form.email"
                        placeholder="Email"
                        :class="{ 'is-invalid': form.errors.has('email') }"
                      />
                      <has-error :form="form" field="email"></has-error>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="experience" class="col-sm-2 col-form-label">Experience</label>
                    <div class="col-sm-10">
                      <textarea
                        class="form-control"
                        name="experience"
                        id="experience"
                        placeholder="Experience"
                      ></textarea>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="photo" class="col-sm-2 col-form-label">Profile Photo</label>
                    <div class="col-sm-10">
                      <input
                        type="file"
                        class="form-control-file"
                        name="photo"
                        id="photo"
                        @change="changePhotoProfile"
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <label
                      for="password"
                      class="col-sm-4 col-form-label"
                    >Password (leave empty if not changing)</label>
                    <div class="col-sm-10">
                      <input
                        type="password"
                        class="form-control"
                        name="password"
                        id="password"
                        placeholder="Password"
                        v-model="form.password"
                        :class="{ 'is-invalid': form.errors.has('password') }"
                      />
                      <has-error :form="form" field="password"></has-error>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-10">
                      <button
                        type="submit"
                        class="btn btn-success"
                        :disabled="form.busy"
                        @click.prevent="updateInfo"
                      >Update</button>
                    </div>
                  </div>
                </form>
              </div>
              <!-- /.tab-pane -->
            </div>
            <!-- /.tab-content -->
          </div>
          <!-- /.card-body -->
        </div>
        <!-- /.nav-tabs-custom -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: new Form({
        id: "",
        name: "",
        email: "",
        password: "",
        type: "",
        bio: "",
        photo: ""
      })
    };
  },
  methods: {
    getProfilePhoto() {
      if (this.form.photo) {
        let imgPath = "img/profile/";
        if (this.form.photo === "profile.png") {
          imgPath = "img/";
        }

        let prefix = this.form.photo.match(/\//) ? "" : imgPath;
        return prefix + this.form.photo;
      }
    },
    changePhotoProfile(e) {
      let file = e.target.files[0];
      if (file["size"] < 2097152) {
        let reader = new FileReader();
        reader.onloadend = file => {
          this.form.photo = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Your file is larger than 2MB"
        });
      }
    },
    updateInfo() {
      this.$Progress.start();
      this.form
        .put("api/profile")
        .then(() => {
          this.form.password = "";
          this.$Progress.finish();
          Toast.fire({
            icon: "success",
            title: "Data successfully updated"
          });
        })
        .catch(() => {
          this.$Progress.fail();
        });
    }
  },
  mounted() {
    console.log("Component mounted.");
  },
  created() {
    axios.get("api/profile").then(({ data }) => {
      this.form.photo = data.photo;
      this.form.fill(data);
    });
  }
};
</script>

<style scoped>
.widget-user-header {
  height: 250px;
}
</style>
