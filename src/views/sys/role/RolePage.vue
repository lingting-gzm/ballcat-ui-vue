<template>
  <div class="ant-pro-page-container-children-content">
    <div v-show="tableShow">
      <!-- 查询条件 -->
      <div class="ant-pro-table-search">
        <a-form v-bind="searchFormLayout">
          <a-row :gutter="16">
            <a-col :md="8" :sm="24">
              <a-form-item label="角色">
                <a-input v-model="queryParam.name" placeholder="请输入" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="标识">
                <a-input v-model="queryParam.code" placeholder="请输入" />
              </a-form-item>
            </a-col>
            <!-- <template v-if="advanced">
             </template>-->
            <a-col :md="8" :sm="24" class="table-page-search-wrapper">
              <div class="table-page-search-submitButtons">
                <a-button type="primary" @click="reloadTable">查询</a-button>
                <a-button style="margin-left: 8px" @click="resetSearchForm">重置</a-button>
                <!--              <a @click="toggleAdvanced" style="margin-left: 8px">-->
                <!--                {{ advanced ? '收起' : '展开' }}-->
                <!--                <a-icon :type="advanced ? 'up' : 'down'"/>-->
                <!--              </a>-->
              </div>
            </a-col>
          </a-row>
        </a-form>
      </div>


      <a-card :bordered="false" :body-style="{padding: 0}">
        <!-- 操作按钮区域 -->
        <div class="ant-pro-table-toolbar">
          <div class="ant-pro-table-toolbar-title">角色管理</div>
          <div class="ant-pro-table-toolbar-option">
            <a-button
              v-has="'sys:sysrole:add'"
              type="primary"
              icon="plus"
              @click="handleAdd()"
            >新建</a-button>
          </div>
        </div>

        <div class="ant-pro-table-wrapper">
          <!--数据表格-->
          <a-table
            ref="table"
            size="middle"
            :row-key="rowKey"
            :columns="columns"
            :data-source="dataSource"
            :pagination="pagination"
            :loading="loading"
            @change="handleTableChange"
          >
            <template #type-slot="text">
              <dict-slot dict-code="role_type" :value="text" />
            </template>
            <template #action-slot="text, record">
              <a v-has="'sys:sysrole:edit'" @click="handleEdit(record)">编辑</a>
              <a-divider type="vertical" />
              <a v-has="'sys:sysrole:grant'" @click="handleGrant(record)">授权</a>
              <a-divider type="vertical" />
              <a v-has="'sys:sysrole:grant'" @click="handleBind(record)">绑定</a>
              <a-divider type="vertical" />
              <a-popconfirm
                v-has="'sys:sysrole:del'"
                title="确认要删除吗？"
                @confirm="() => handleDel(record)"
              >
                <a href="javascript:" class="ballcat-text-danger">删除</a>
              </a-popconfirm>
            </template>
          </a-table>
        </div>
      </a-card>
    </div>

    <!-- 表单弹窗 -->
    <role-modal-form
      ref="formModal"
      @reload-page-table="reloadTable"
    />

    <!-- 角色授权弹窗 -->
    <role-grant-drawer ref="roleGrantDrawer" />

    <!-- 角色用户绑定弹窗 -->
    <role-user-modal ref="roleUserModal" />
  </div>
</template>

<script>
import { getPage, delObj } from '@/api/sys/role'
import RoleModalForm from './RoleModalForm'
import RoleGrantDrawer from './RoleGrantDrawer'
import { TablePageMixin } from '@/mixins'
import RoleUserModal from '@/views/sys/role/RoleUserModal'

export default {
  name: 'RolePage',
  components: {
    RoleUserModal,
    RoleGrantDrawer,
    RoleModalForm
  },
  mixins: [TablePageMixin],
  data () {
    return {
      getPage: getPage,
      delObj: delObj,

      columns: [
        {
          title: '#',
          dataIndex: 'id'
        },
        {
          title: '角色名称',
          dataIndex: 'name',
          sorter: true
        },
        {
          title: '角色标识',
          dataIndex: 'code',
          sorter: true
        },
        {
          title: '类型',
          dataIndex: 'type',
          sorter: true,
          scopedSlots: { customRender: 'type-slot' }
        },
        {
          title: '备注',
          dataIndex: 'note',
          sorter: true
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          width: '180px',
          sorter: true
        },
        {
          title: '更新时间',
          dataIndex: 'updateTime',
          width: '180px',
          sorter: true
        },
        {
          title: '操作',
          align: 'center',
          width: '200px',
          scopedSlots: { customRender: 'action-slot' }
        }
      ]
    }
  },
  methods: {
    // 新建角色
    handleAdd () {
      this.$refs.formModal.add({title: '新建角色'})
    },
    // 编辑角色
    handleEdit (record) {
      this.$refs.formModal.update(record, {title: '编辑角色'})
    },
    // 对角色授权
    handleGrant (record) {
      this.$refs.roleGrantDrawer.showDrawer(record)
    },
    // 为角色做用户绑定
    handleBind (record) {
      this.$refs.roleUserModal.show(record)
    }
  }
}
</script>
