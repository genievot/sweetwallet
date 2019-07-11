<template>
  <q-page padding style="background-image: linear-gradient(navy, blue);">
    <q-dialog persistent v-model="dialog" position="top">
      <q-card style="width: 500px">
        <q-card-section class="row items-center no-wrap">
          <div style="width: 90vw">
            <q-input  class="justify-center" filled v-model="text" label="Username" />
          </div>
          <q-space />
          <q-btn round icon="done" class="text-blue q-ml-sm" close-popup @click="findUser()"/>
          <q-btn round icon="close" class="text-blue q-ml-sm" close-popup @click="dialog=false"/>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog persistent v-model="transfermodel" position="top">
      <q-card>
        <q-card-section class="row items-center no-wrap">
          <div class="row justify-center" style="width: 90vw">
            <q-input style="width: 70vw" filled v-model="steemtotrx" label="Username" />
          </div>
         </q-card-section>
          <q-card-section class="row items-center no-wrap">
          <div class="row justify-center" style="width: 90vw">
            <q-input style="width: 72vw" type="number" filled v-model="amounttotex" label="Amount" />
          </div>
         </q-card-section>
          <q-space />
        <q-card-section class="row justify-center no-wrap">
            <q-btn style="width: 25vw" class="q-ma-sm" unelevated color="green" outline rounded @click.native="transfersteem('STEEM')" text-color="green">
              Steem
            </q-btn>
            <q-btn style="width: 25vw" class="q-ma-sm" unelevated color="primary" outline rounded @click.native="transfersteem('SBD')" text-color="primary">
              SBD
            </q-btn>
            <q-btn style="width: 25vw" class="q-ma-sm" unelevated color="blue" outline rounded @click.native="transfersteem('SWEET')" text-color="primary">
              SWEET
            </q-btn>
       </q-card-section>
        <q-card-section class="row justify-center no-wrap">
          <q-btn round icon="close" class="text-red q-ml-sm" close-popup @click="transfermodel = false"/>
       </q-card-section>
      </q-card>
    </q-dialog>
    <div class="justify-center" align="center">
    <span class="text-h5 text-white text-weight-bold">{{user}}</span>
    </div>
        <q-card bordered>

      <q-card-section>
        <span class="text-h6 text-weight-light text-green">SWEET:</span> {{balance}}
      </q-card-section>
      <q-card-section>
        <span class="text-h6 text-weight-light text-green">Staked SWEET:</span> {{stake}}
      </q-card-section>
            <q-separator inset />
            <q-card-section>
        <span class="text-h6 text-weight-light text-green">STEEM:</span> {{steem}}
      </q-card-section>
            <q-card-section>
        <span class="text-h6 text-weight-light text-green">STEEM DOLLARS:</span> ${{steem_dollars}}
      </q-card-section>
            <q-card-section>
        <span class="text-h6 text-weight-light text-green">STEEM POWER:</span> {{steem_power}}
      </q-card-section>
      <q-separator inset />
      <q-card-section v-if="pendingUnStake > 0">
        <span class="text-h6 text-weight-light text-yellow-9">Pending UnStake:</span> {{pendingUnStake}}
      </q-card-section>
    </q-card>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn fab icon="arrow_downward" class="text-white" color="purple-8" @click="transfermodel=true"/>
  </q-page-sticky>
  <q-page-sticky position="bottom-left" :offset="[18, 18]">
    <q-btn fab icon="arrow_upward" class="text-white" color="indigo-8" @click="dialog=true"/>
  </q-page-sticky>
  </q-page>
</template>

<script>
export default {
  name: 'sweettoken',
  data () {
    return {
      dialog: true,
      text: '',
      user: '',
      balance: '',
      pendingUnStake: '',
      stake: '',
      steem: '',
      steem_dollars: '',
      steem_power: '',
      spv: null,
      transfermodel: false,
      steemtotrx: null,
      amounttotex: null
    }
  },
  methods: {
    // https://beta.steemconnect.com/sign/transfer?to=genievot&amount=500%20SBD
    transfersteem (curr) {
      let url = 'https://beta.steemconnect.com/sign/transfer?to=' + this.steemtotrx + '&amount=' + this.amounttotex.toString() + '%20' + curr.toString()
      var win = window.open(url, '_blank')
      win.focus()
    },
    findUser () {
      let username = this.text.trim().replace(/\s/g, '')
      if (this.text.trim() === '') {
        this.$q.notify('Please enter some value')
      } else {
        // console.log(username)
        this.$ssc.find('tokens', 'balances', { account: username, symbol: 'SWEET' }, 1000, 0, [], (err, res) => {
          console.log(err, res)
          if (!err && res[0].account != null) {
            this.user = res[0].account
            this.balance = parseFloat(res[0].balance).toFixed(4)
            this.stake = parseFloat(res[0].stake).toFixed(4)
            this.pendingUnStake = parseFloat(res[0].pendingUnstake).toFixed(4)
          } else {
            this.$q.notify({ color: 'warning', message: 'No such user exist', icon: 'warning' })
          }
        })
        this.dialog = false
      }
      this.$steem.api.getAccounts([username], (err, res) => {
        if (!err) {
          this.steem = parseFloat(res[0].balance).toFixed(3)
          this.steem_dollars = parseFloat(res[0].sbd_balance).toFixed(3)
          let vests = res[0].vesting_shares
          this.$steem.api.getDynamicGlobalProperties((err, result) => {
            if (!err) {
              this.spv = (parseFloat(result.total_vesting_fund_steem) * parseFloat(vests)) / parseFloat(result.total_vesting_shares)
              // console.log(parseFloat(this.steem))
              this.steem_power = this.spv.toFixed(3)
            }
            console.log(result)
          })
        } else {
          this.$q.notify({ color: 'warning', message: 'No such user exist', icon: 'warning' })
        }
      })
    }
  },
  mounted () {
    this.$ssc.getContractInfo('market', (err, result) => {
      console.log(err, result)
    })
    this.$steem.api.getDynamicGlobalProperties((err, result) => {
      console.log(err, result)
    })
    this.$steem.api.getAccounts(['ned'], (err, res) => { console.log(res, err) })
    // this.$steem.api.getAccountHistory('aneilpatel', -1, 1000, (err, result) => {
    //   if (err) {
    //     console.log(err)
    //   }
    //   result.forEach((po) => {
    //     if (po[1].op[0] === 'transfer') {
    //       console.log(po)
    //     } else {
    //       console.log(po[1].op[0])
    //     }
    //   })
    // })
    // this.$ssc.stream((err, res) => {
    //   console.log(err, res)
    // })
  }
}
</script>

<style>
</style>
